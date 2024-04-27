const ampq = require("amqplib");
const { MQ_HOST } = require("./config");
const { Image } = require("./models/db");

const publishMessage = async () => {
  try {
    const connection = await ampq.connect(`amqp://${MQ_HOST}`);
    const channel = await connection.createChannel();
    const queueName = "labor-image-queue";

    const imageData = await Image.findAll({
      attributes: ["caption", "detection"],
      raw: true,
    });

    let message = [];

    for (const imag of imageData) {
      message.push({
        caption: imag.caption,
        detection: imag.detection.length,
      });
    }

    message = JSON.stringify(message);

    await channel.assertQueue(queueName, { durable: false });

    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Message sent: ${message}`);
  } catch (e) {
    console.error(e);
  }
};

exports.publishMessage = publishMessage;

// TODO: Valahol kiszedni az infót, másik oldalt meg az adminokat és kiküldeni a levelet
