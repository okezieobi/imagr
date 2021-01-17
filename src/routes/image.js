export default (Router, handleResponse,
  {
    image: {
      createOne, getAllByOwner, verifyOne, getAllByQuery, getAll,
    },
  }) => {
  const router = Router();

  router.get('/all', getAll, handleResponse);
  router.get('/search', getAllByQuery, handleResponse);

  router.route('/')
    .post(createOne, handleResponse)
    .get(getAllByOwner, handleResponse);

  router.use('/:id', verifyOne);
  router.route('/:id')
    .get(handleResponse);

  return router;
};
