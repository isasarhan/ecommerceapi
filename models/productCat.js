const { model, Schema } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const categorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

const validateCategory = (category) => {
  const schema = Joi.object({
    title: Joi.string(),
    imageUrl: Joi.string(),
    description: Joi.string(),
  });
  return schema.validate(category)
}
module.exports = { Category, validateCategory };
