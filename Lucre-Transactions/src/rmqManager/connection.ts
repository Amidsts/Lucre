import {qm} from 'lucre-common'

export const rmq = qm.RpcManager.setup({ subscribers:[] },"amqp://localhost");
