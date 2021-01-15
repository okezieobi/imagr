export default class ImageServices {
  constructor({ Image }) {
    this.model = Image;
  }

  async create({ description, source, userId }) {
    const image = await this.model.create({ description, source, userId });
    return { image, status: 201 };
  }

  async findByOwner({ userId }) {
    const entities = await this.model.find({ userId }, '_id description source createdAt userId updatedAt', { limit: 10, sort: '-createdAt' });
    return { entities, status: 200 };
  }

  async findOneByOwner({ userId, _id }) {
    let data;
    const image = await this.model.findOne({ $and: [{ userId }, { _id }] }, '_id description userId source createdAt updatedAt');
    if (image) data = { image, status: 200 };
    else data = { message: 'Inage not found', status: 404 };
    return data;
  }
}
