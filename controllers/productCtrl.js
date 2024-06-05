const asyncHandler = require("express-async-handler");
const { Product, validateProduct } = require("../models/product");
const validateMongoDbId = require("../utils/validateMongodbId.js");

const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const product = await Product.findById(id)
    if (!product) return res.send('product not found').status(404)
    res.json(product).status(200)
})
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.json(products)
})
const addProduct = asyncHandler(async (req, res) => {
    const { errors } = validateProduct(req.body);
    if (errors) return res.send(errors.details[0].message).status(400);
    const newProduct = await Product.create(req.body);
    res.json(newProduct).sendStatus(200)
})
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const { error } = validateProduct(req.body)
    if (error) return res.json(error.details[0].message).status(400)
    const result = await Product.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true })
    res.json(result)
})
const deleteProductById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) return res.send('Error deleting product').status(400)
    res.json(deletedProduct).status(200)
})

module.exports = { getProductById, getAllProducts, addProduct, updateProduct, deleteProductById }