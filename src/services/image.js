/* eslint-disable no-underscore-dangle */
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

  async getOne({ _id }) {
    let data;
    const image = await this.model.findOne({ _id }, '_id description userId source createdAt updatedAt onSale owner');
    if (image) data = { image, status: 200 };
    else data = { message: 'Image not found', status: 404 };
    return data;
  }

  async toggleOnSale({ imageId, userId, onSale }) {
    let data;
    const ownsImage = await this.model.findOne({ $and: [{ userId }, { _id: imageId }] }, '_id description userId source createdAt updatedAt onSale owner');
    if (ownsImage && ownsImage.owner) {
      if (ownsImage.onSale === onSale) data = { message: 'Image is already set as intended', status: 400 };
      else {
        await this.model.updateOne({ $and: [{ userId }, { _id: imageId }] }, { onSale });
        const image = await this.model.findOne({ $and: [{ userId }, { _id: imageId }] }, '_id description userId source createdAt updatedAt onSale owner');
        data = { image, status: 200 };
      }
    } else data = { message: 'Image can only be put on sale by owner', status: 400 };
    return data;
  }

  async buyImage({ imageData, userId }) {
    let data;
    const ownsImage = await this.model.findOne({ $and: [{ userId }, { _id: imageData._id }] }, '_id description userId source createdAt updatedAt onSale owner');
    if (imageData.onSale) {
      if (!ownsImage) {
        const imageCopy = {
          description: imageData.description,
          source: imageData.source,
          userId,
          owner: false,
        };
        const image = await this.model.create(imageCopy);
        data = { image, status: 201 };
      } else data = { message: 'Already own image', status: 400 };
    } else data = { message: 'Image is not on sale', status: 400 };
    return data;
  }
}
