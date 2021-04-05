export default class ImageSchema {
  constructor(checkSchema) {
    this.validateInput = checkSchema({
      description: {
        in: ['body'],
        isLength: {
          errorMessage: 'image description should be at least 1 character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Image description must be string data type',
        },
        exists: {
          errorMessage: 'Image description is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateSearchInput = checkSchema({
      search: {
        in: ['query'],
        isLength: {
          errorMessage: 'image description should be at least 1 character long',
          options: { min: 1 },
        },
      },
    });

    this.validateEntryId = checkSchema({
      id: {
        in: ['params'],
        isMongoId: {
          errorMessage: 'Entity id does not match MongoId format',
        },
      },
    });
  }
}
