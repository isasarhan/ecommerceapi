const { model, Schema } = require("mongoose");

var couponSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const Coupon = model("Coupon", couponSchema);

module.exports = { Coupon };
