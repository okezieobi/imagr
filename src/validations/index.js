import { validationResult, checkSchema } from 'express-validator';

import UserSchema from './user';
import ImageSchema from './image';
import fileUpload from '../utils/fileUpload';

const handleValidationErr = (status = 400) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status });
};

const handleFileUploadErr = ({ file }, res, next) => {
  if (file) next();
  else next({ message: 'File upload is required', status: 400 });
};

const userSchema = new UserSchema(checkSchema);
const imageSchema = new ImageSchema(checkSchema);

export default {
  user: {
    signup: [fileUpload.image.single('avatar'), handleFileUploadErr, userSchema.validateSignup, handleValidationErr()],
    login: [userSchema.validateLogin, handleValidationErr()],
    jwt: [userSchema.validateJWT, handleValidationErr(401)],
  },
  image: {
    create: [fileUpload.image.single('picture'), handleFileUploadErr, imageSchema.validateInput, handleValidationErr()],
    id: [imageSchema.validateEntryId, handleValidationErr()],
    search: [imageSchema.validateSearchInput, handleValidationErr()],
  },
};
