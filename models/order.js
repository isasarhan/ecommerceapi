const { model, Schema } = require("mongoose");
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const orderSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      count: Number,
      color: String,
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: "Not Processed",
    enum: [
      "Not Processed",
      "Cash on Delivery",
      "Processing",
      "Dispatched",
      "Cancelled",
      "Delivered",
    ],
  },
  orderby: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = model("Order", orderSchema);

const validateOrder = (order) => {
  const schema = Joi.object({
    products: Joi.array(),
    orderStatus: Joi.string(),
    orderby: Joi.objectId(),
  });
  return schema.validate(order)
};
module.exports = { Order, validateOrder };
