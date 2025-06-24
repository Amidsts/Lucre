export declare const broadcastsSubscribers: {
    config: {
        publisher: import("lucre-common/build/amqplib/src/types").Publishers;
        message: string;
    };
    onMessageReceived: (params: import("lucre-common/build/amqplib/src/queue_interfaces/broadcasts").newUserRequest) => Promise<void>;
}[];
