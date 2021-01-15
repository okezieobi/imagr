export default (Schema) => {
  const schema = new Schema({
    description: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    owner: {
      type: Boolean,
      default: true,
    },
  }, { timestamps: true });

  return schema;
};