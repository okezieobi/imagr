export default class ImageMiddleware {
  constructor(validations, controllers) {
    this.createOne = [...validations.image.create, controllers.image.createOne];
    this.getAll = controllers.image.findAll;
    this.verifyOne = [...validations.image.id, controllers.image.findOneById];
  }
}
