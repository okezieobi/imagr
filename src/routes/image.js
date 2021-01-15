export default (Router, handleResponse,
  {
    image: {
      createOne, getAll, verifyOne,
    },
  }) => {
  const router = Router();

  router.route('/')
    .post(createOne, handleResponse)
    .get(getAll, handleResponse);

  router.use('/:id', verifyOne);
  router.route('/:id')
    .get(handleResponse);

  return router;
};
