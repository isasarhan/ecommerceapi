const asyncHandler = require("express-async-handler");
const { Product, validateProduct } = require("../models/product");
const validateMongoDbId = require("../utils/validateMongodbId.js");
var url = require('url');

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

function fullUrl(req, imageName) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: `/uploads/${imageName}`
    });
}
const addProduct = asyncHandler(async (req, res) => {

    const { errors } = validateProduct(req.body);
    if (errors) return res.send(errors.details[0].message).status(400);
    const newProduct = new Product(
        {
            title: req.body.title,
            slug: req.body.slug,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            featuredImage: req.file ? fullUrl(req, req.file.filename) : "",
            price: req.body.price,
            sale: req.body.sale,
            rating: req.body.rating,
            ratings: req.body.ratings,
            category:req.body.category
        }
    ); 
    await newProduct.save()
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