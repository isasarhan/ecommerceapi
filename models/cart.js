const { model, Schema } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const cartSchema = new Schema(
  {
    orderby: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        _id: false,
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        count: { type: Number, default: 1 },
        imgUrl: String,
        title: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

const validateCart = (cart) => {
  const schema = Joi.object({
    orderby: Joi.objectId(),
    products: Joi.array(),
    cartTotal: Joi.number(),
    totalAfterDiscount: Joi.number(),
  });
  return schema.validate(cart);
};

module.exports = { Cart, validateCart };
