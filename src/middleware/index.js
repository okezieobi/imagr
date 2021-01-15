import controllers from '../controllers';
import validations from '../validations';
import UserMiddleware from './user';
import ImageMiddleware from './image';

const user = new UserMiddleware(validations, controllers);
const image = new ImageMiddleware(validations, controllers);

export default {
  user, image,
};
