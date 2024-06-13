const { model, Schema } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    featuredImage: { type: String },
    images: [
      {
        _id: false,
        url: String,
      },
    ],
    category: {
      _id: false,
      categoryid: { type: Schema.Types.ObjectId, ref: "Category" },
      title: String
    },
    tags: String,
    rating: Number,
    ratings: [
      {
        star: { type: Number, max: 5 },
        comment: String,
        postedby: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    price: { type: Number },
    sale: { type: Number, default:0 },
    author: String
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

const validateProduct = (product) => {
  const schema = Joi.object({
    title: Joi.string(),
    slug: Joi.allow(),
    ratings: Joi.allow(),
    category: Joi.allow(),
    tags: Joi.allow(),
    featuredImage: Joi.allow(),
    shortDescription: Joi.string(),
    longDescription: Joi.string(),
    images: Joi.allow(),
    price: Joi.number(),
  });
  return schema.validate(product);
};

module.exports = { Product, validateProduct };
