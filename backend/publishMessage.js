const ampq = require('amqplib');
const { MQ_HOST } = require('./config');

const publishMessage = async () => {
    try{

        const connection = await ampq.connect(`amqp://${MQ_HOST}`);
        const channel = await connection.createChannel();
        const queueName = 'labor-image-queue';
        
        await channel.assertQueue(queueName, {durable: false});
        
        const message  = JSON.stringify({
            text: 'Hello RabbitMQ',
            day: new Date().toDateString()
        });
        
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`Message sent: ${message}`);
    } catch (e) {
        console.error(e);
    }
}

exports.publishMessage = publishMessage;