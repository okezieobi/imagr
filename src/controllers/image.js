/* eslint-disable no-underscore-dangle */
export default class ImageController {
  constructor({ image }, handleServiceOutput) {
    this.service = image;
    this.createOne = this.createOne.bind(this);
    this.findByOwner = this.findByOwner.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.findAllByQuery = this.findAllByQuery.bind(this);
    this.findAll = this.findAll.bind(this);
    this.handleServiceOutput = handleServiceOutput;
  }

  createOne({ body, file: { path } }, res, next) {
    this.service.create({ , source: path, userId: res.locals.userId })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findAllByQuery({ params }, res, next) {
    this.service.findByQuery(params)
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findAll(req, res, next) {
    this.service.findAll()
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findByOwner(req, res, next) {
    this.service.findByOwner(res.locals)
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findOneById({ params: { id } }, res, next) {
    this.service.findOneByOwner({ userId: res.locals.userId, _id: id })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }
}
