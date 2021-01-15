/* eslint-disable no-underscore-dangle */
export default class EntityController {
  constructor({ image }, handleServiceOutput) {
    this.service = image;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.handleServiceOutput = handleServiceOutput;
  }

  createOne({ body: { title, body } }, res, next) {
    this.service.create({ title, body, userId: res.locals.userId })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findAll(req, res, next) {
    this.service.findByOwner(res.locals)
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findOneById({ params: { id } }, res, next) {
    this.service.findOneByOwner({ userId: res.locals.userId, _id: id })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }
}
