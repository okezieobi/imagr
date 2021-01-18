export default class ImageMiddleware {
  constructor(validations, controllers) {
    this.createOne = [...validations.image.create, controllers.image.createOne];
    this.getAllByOwner = controllers.image.findByOwner;
    this.getAllByQuery = [...validations.image.search, controllers.image.findAllByQuery];
    this.verifyOne = [...validations.image.id, controllers.image.findOneById];
    this.getAll = controllers.image.findAll;
    this.toggleOnSale = controllers.image.toggleOnSale;
    this.buyOne = controllers.image.buyOne;
    this.deleteOne = controllers.image.deleteOne;
  }
}
