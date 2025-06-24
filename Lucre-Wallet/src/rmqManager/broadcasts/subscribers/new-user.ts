import { qInterfaces } from 'lucre-common';
import User from 'src/users/entities/user.entity';

type Request = qInterfaces.broadcasts.newUserRequest;
const config = qInterfaces.broadcasts.newUserConfig;

async function onMessageReceived(params: Request) {
  const response = JSON.parse(params.toString());
  console.log('response', response);

  await User.createUser(response);
}

export default { config, onMessageReceived };
