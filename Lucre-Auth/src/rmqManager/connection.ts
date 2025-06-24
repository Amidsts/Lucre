import {qm} from 'lucre-common'

export const rmq = qm.RpcManager.setup({ broadcastSubscriberConfigs:[], taskSubscriberConfigs: [], questionSubscriberConfigs: [] },"amqp://localhost");
