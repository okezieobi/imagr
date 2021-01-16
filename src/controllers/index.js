import services from '../services';
import UserController from './user';
import ImageController from './image';

const handleServiceOutput = (data, { locals }, next) => {
  if (data.message) throw data;
  else {
    const resLocal = locals;
    resLocal.data = data;
    next();
  }
};
const user = new UserController(services, handleServiceOutput);
const image = new ImageController(services, handleServiceOutput);

export default {
  user, image, User: UserController,
};
