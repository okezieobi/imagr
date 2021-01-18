export default (Router, handleResponse,
  {
    image: {
      createOne, getAllByOwner, verifyOne, getAllByQuery, getAll, toggleOnSale, buyOne, deleteOne,
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
    .get(handleResponse)
    .delete(deleteOne, handleResponse);

  router.put('/:id/sell', toggleOnSale, handleResponse);
  router.post('/:id/buy', buyOne, handleResponse);

  return router;
};
