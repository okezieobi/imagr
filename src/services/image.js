export default class EntityServices {
  constructor({ Image }) {
    this.model = Image;
  }

  async create({ description, source, userId }) {
    const entity = await this.model.create({ description, source, userId });
    return { entity, status: 201 };
  }

  async findByOwner({ userId }) {
    const entities = await this.model.find({ userId }, '_id description source createdAt userId updatedAt', { limit: 10, sort: '-createdAt' });
    return { entities, status: 200 };
  }

  async findOneByOwner({ userId, _id }) {
    let data;
    const entity = await this.model.findOne({ $and: [{ userId }, { _id }] }, '_id description userId source createdAt updatedAt');
    if (entity) data = { entity, status: 200 };
    else data = { message: 'Entity not found', status: 404 };
    return data;
  }
}
