const { model, Schema } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const blogSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "BCategory" },
});

const Blog = model("Blog", blogSchema);

const validateBlog = (blog) => {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    author: Joi.objectId(),
    category: Joi.objectId(),
  });
  return schema.validate(blog);
};

module.exports = { Blog, validateBlog };
