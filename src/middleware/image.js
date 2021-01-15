export default class EntityMiddleware {
  constructor(validations, controllers) {
    this.createOne = [...validations.image.create, controllers.image.createOne];
    this.getAll = controllers.image.findAll;
    this.verifyOne = [...validations.image.id, controllers.image.findOneById];
  }
}
