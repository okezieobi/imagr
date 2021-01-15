import models from '../models';
import UserServices from './user';
import ImageServices from './image';

const user = new UserServices(models);
const image = new ImageServices(models);

export default {
  user, image,
};
