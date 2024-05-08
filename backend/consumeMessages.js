const amqp = require("amqplib");
const nodeMailer = require("nodemailer");
const { MQ_HOST, MAIL_USER, MAIL_PASS } = require("./config");
const { Admin } = require("./models/db");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const consumeMessages = async () => {
  try {
    const connection = await amqp.connect(`amqp://${MQ_HOST}`);
    const channel = await connection.createChannel();
    const queueName = "labor-image-queue";

    await channel.assertQueue(queueName, { durable: false });

    console.log("Labor MQ is waiting for messages...");

    channel.consume(
      queueName,
      async (msg) => {
        const message = JSON.parse(msg.content.toString());
        console.log(`Received message: ${JSON.stringify(message)}`);
        const admins = await Admin.findAll({ raw: true });
        console.log(admins);

        for (const admin of admins) {
          console.log("sending email to admin", admin.email);
          const mailOptions = {
            from: MAIL_USER,
            to: admin.email, // TODO: Actual admin
            subject: "Labor MQ test",
            text: JSON.stringify(message),
          };

          await transporter.sendMail(mailOptions);
        }

        // Implement email sending logic here
      },
      { noAck: true },
    );
  } catch (e) {
    console.error(e);
  }
};

exports.consumeMessages = consumeMessages;
