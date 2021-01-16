export default class ImageServices {
  constructor({ Image }) {
    this.model = Image;
  }

  async create({
    description, source, userId, onSale,
  }) {
    const image = await this.model.create({
      description, source, onSale, userId,
    });
    return { image, status: 201 };
  }

  async findByQuery({ search }) {
    const query = new RegExp(search, 'i');
    const images = await this.model.find({ description: query }, '_id description source createdAt userId updatedAt onSale owner', { limit: 10, sort: '-createdAt' });
    return { images, status: 200 };
  }

  async findAll() {
    const images = await this.model.find({}, '_id description source createdAt userId updatedAt onSale owner', { limit: 10, sort: '-createdAt' });
    return { images, status: 200 };
  }

  async findByOwner({ userId }) {
    const images = await this.model.find({ userId }, '_id description source createdAt userId updatedAt onSale owner', { limit: 10, sort: '-createdAt' });
    return { images, status: 200 };
  }

  async findOneByOwner({ userId, _id }) {
    let data;
    const image = await this.model.findOne({ $and: [{ userId }, { _id }] }, '_id description userId source createdAt updatedAt onSale owner');
    if (image) data = { image, status: 200 };
    else data = { message: 'Image not found', status: 404 };
    return data;
  }
}
