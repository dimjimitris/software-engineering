import env from "./env.js";
import { Kafka } from "kafkajs";
import { v1 } from "uuid";

export const codes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
};

const kafka = new Kafka({
    clientId: env.KAFKA_CLIENT_ID,
    brokers: env.KAFKA_BROKERS,
});

const producers = Array.from(
    { length: env.KAFKA_PRODUCER_TOPIC.length },
    () => {
        return kafka.producer();
    }
);

for (const producer of producers) {
    producer.on("producer.connect", () =>
        console.log("Kafka producer connected")
    );
    producer.on("producer.disconnect", () =>
        console.log("Kafka producer disconnected")
    );
}

const consumer = kafka.consumer({ groupId: env.KAFKA_CONSUMER_GROUP_ID });
consumer.on("consumer.connect", () => console.log("Kafka consumer connected"));
consumer.on("consumer.disconnect", () =>
    console.log("Kafka consumer disconnected")
);

async function startConsumer() {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: env.KAFKA_CONSUMER_TOPIC });
        await consumer.run({
            eachMessage: async ({ topic, message }) => {
                if (message.value == null) {
                    console.error(
                        `Received empty kafka message in topic '${topic}'`
                    );
                    return;
                }

                const { userId, chartOptions } = JSON.parse(
                    message.value.toString()
                );
                const data = await createSVG(chartOptions);
                const id = v1();

                for (const [i, producer] of producers.entries()) {
                    await producer.send({
                        topic: env.KAFKA_PRODUCER_TOPIC[i],
                        messages: [
                            {
                                value: JSON.stringify({
                                    id,
                                    userId,
                                    data: data[i],
                                }),
                            },
                        ],
                    });
                }
            },
        });
    } catch (err) {
        console.error(
            `Error in consumer of group [${env.KAFKA_CONSUMER_GROUP_ID}] ${e.meesage}`,
            e
        );
    }
}

startConsumer();

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
    process.on(type, async (e) => {
        try {
            console.log(`process.on ${type}`);
            console.error(e);
            await consumer.disconnect();
            process.exit(0);
        } catch {
            process.exit(1);
        }
    });
});

signalTraps.forEach((type) => {
    process.once(type, async () => {
        try {
            await consumer.disconnect();
        } finally {
            process.kill(process.pid, type);
        }
    });
});
