import { qInterfaces } from 'lucre-common';
type Request = qInterfaces.broadcasts.newUserRequest;
declare function onMessageReceived(params: Request): Promise<void>;
declare const _default: {
    config: {
        publisher: import("lucre-common/build/amqplib/src/types").Publishers;
        message: string;
    };
    onMessageReceived: typeof onMessageReceived;
};
export default _default;
