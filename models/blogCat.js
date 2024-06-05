const { model, Schema } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const blogCategorySchema = new Schema({
  title: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  description: { type: String },
});

const BlogCategory = model("BCategory", blogCategorySchema);

const validateBlogCat = (category) => {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    imageUrl: Joi.objectId(),
  });
  return schema.validate(category);
};

module.exports = { BlogCategory, validateBlogCat };