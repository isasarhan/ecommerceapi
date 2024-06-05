const asyncHandler = require("express-async-handler");
const { Cart, validateCart } = require("../models/cart.js");
const validateMongoDbId = require("../utils/validateMongoDbId");

const getCartById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const cart = await Cart.findById(id)
    if (!cart) return res.send('Cart not found').status(404)
    res.json(cart).status(200)
})
const getAllCarts = asyncHandler(async (req, res) => {
    const cart = await Cart.find()
    res.json(cart)
})
const addCart = asyncHandler(async (req, res) => {
    const { errors } = validateCart(req.body);
    if (errors) return res.send(errors.details[0].message).status(400);
    const newCart = await Cart.create(req.body);
    res.json(newCart).sendStatus(200)
})
const updateCart = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const { error } = validateCart(req.body)
    if (error) return res.json(error.details[0].message).status(400)
    const result = await Cart.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true })
    res.json(result)
})
const deleteCartById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const deletedCart = await Cart.findByIdAndDelete(id)
    if (!deletedCart) return res.send('Error deleting Cart').status(400)
    res.json(deletedCart).status(200)
})

module.exports = { getCartById, getAllCarts, addCart, updateCart, deleteCartById }