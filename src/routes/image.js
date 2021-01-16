export default (Router, handleResponse,
  {
    image: {
      createOne, getAllByOwner, verifyOne, getAllByQuery, getAll,
    },
  }) => {
  const router = Router();

  router.route('/')
    .post(createOne, handleResponse)
    .get(getAllByOwner, handleResponse);

  router.get('/all', getAll, handleResponse);
  router.get('/:search', getAllByQuery, handleResponse);

  router.use('/:id', verifyOne);
  router.route('/:id')
    .get(handleResponse);

  return router;
};
