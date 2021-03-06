import userRoutes from './user';
import imageRoutes from './image';
import middleware from '../middleware';

export default (Router) => {
  const router = Router();

  const handleResponse = (req, res) => {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  };

  router.use('/auth', userRoutes(Router, handleResponse, middleware));
  router.use(middleware.user.jwt);
  router.use('/images', imageRoutes(Router, handleResponse, middleware));

  return router;
};
