import { qInterfaces } from "lucre-common";
import { rmq } from "../../connection";

type Request = qInterfaces.broadcasts.newUserRequest;
const config = qInterfaces.broadcasts.newUserConfig;

export async function createNewUser(params: Request) {
  (await rmq).publishBroadcast(params, config);
}
