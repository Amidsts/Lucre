import { qm } from 'lucre-common';
import { broadcastsSubscribers } from './broadcasts/subscribers';

export const rmq = qm.RpcManager.setup(
  {
    broadcastSubscriberConfigs: broadcastsSubscribers,
    taskSubscriberConfigs: [],
    questionSubscriberConfigs: [],
  },
  'amqp://localhost',
);
