const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const bcrypt = require('bcrypt')
const { model, Schema } = require("mongoose");
const jwt = require('jsonwebtoken')
var userSchema = new Schema(
  {
    firstname: { type: String, required: true, },
    lastname: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    mobile: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    role: { type: String, default: "customer", },
    isBlocked: { type: Boolean, default: false, },
    address: { type: String, },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateToken = function () {
  const id = this._id
  return token = jwt.sign({ id }, process.env.secretKey, {
    expiresIn: "1d"
  })
};

const User = model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string(),
    password: Joi.string(),
    role: Joi.string().allow(),
    isBlocked: Joi.boolean().allow(),
    address: Joi.string(),
    wishlist: Joi.array(),
    refreshToken: Joi.string(),
    passwordChangedAt: Joi.date(),
    passwordResetToken: Joi.date(),
    passwordResetExpires: Joi.date(),
  });
  return schema.validate(user)
};

module.exports = { User, validateUser };
