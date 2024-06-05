const asyncHandler = require("express-async-handler");
const { Order, validateOrder } = require("../models/order.js");
const validateMongoDbId = require("../utils/validateMongoDbId");
const { Cart } = require("../models/cart.js");

const getOrderById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const order = await Order.findById(id)
    if (!order) return res.send('Order not found').status(404)
    res.json(order).status(200)
})
const getAllOrders = asyncHandler(async (req, res) => {
    const order = await Order.find()
    res.json(order)
})
const addOrder = asyncHandler(async (req, res) => {
    const { errors } = validateOrder(req.body);
    if (errors) return res.send(errors.details[0].message).status(400);
    let id;
    if (req.user) {
        id = req.user._id
    }else if(req.body.orderby) id = req.body.orderby

    else throw new Error("Cound not resolve Order! No User Found");

    let cart = await Cart.findOne({ orderby: id })

    const newOrder = await Order.create(req.body);
    cart &&  await cart.deleteOne()
    res.json(newOrder).sendStatus(200)
})
const updateOrder = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const { error } = validateOrder(req.body)
    if (error) return res.json(error.details[0].message).status(400)
    const result = await Order.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true })
    res.json(result)
})
const deleteOrderById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const deletedOrder = await Order.findByIdAndDelete(id)
    if (!deletedOrder) return res.send('Error deleting Order').status(400)
    res.json(deletedOrder).status(200)
})

module.exports = { getOrderById, getAllOrders, addOrder, updateOrder, deleteOrderById }