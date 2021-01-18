/* eslint-disable no-underscore-dangle */
export default class ImageController {
  constructor({ image }, handleServiceOutput) {
    this.service = image;
    this.createOne = this.createOne.bind(this);
    this.findByOwner = this.findByOwner.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.findAllByQuery = this.findAllByQuery.bind(this);
    this.findAll = this.findAll.bind(this);
    this.toggleOnSale = this.toggleOnSale.bind(this);
    this.buyOne = this.buyOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.handleServiceOutput = handleServiceOutput;
  }

  createOne({ body, file: { path } }, res, next) {
    this.service.create({ ...body, source: path, userId: res.locals.userId })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findAllByQuery({ query }, res, next) {
    this.service.findByQuery(query)
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
    this.service.getOne({ _id: id })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  toggleOnSale({ body: { onSale } }, res, next) {
    this.service.toggleOnSale({
      imageId: res.locals.data.image._id,
      userId: res.locals.userId,
      onSale,
    })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  buyOne(req, res, next) {
    this.service.buyImage({ imageData: res.locals.data.image, userId: res.locals.userId })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  deleteOne(req, res, next) {
    this.service.deleteOne({ imageId: res.locals.data.image._id, userId: res.locals.userId })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }
}
