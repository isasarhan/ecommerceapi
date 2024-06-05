const asyncHandler = require("express-async-handler");
const { Category, validateCategory } = require("../models/productCat.js");
const validateMongoDbId = require("../utils/validateMongoDbId");

const getCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const category = await Category.findById(id)
    if (!category) return res.send('Category not found').status(404)
    res.json(category).status(200)
})
const getAllCategories = asyncHandler(async (req, res) => {
    const category = await Category.find()
    res.json(category)
})
const addCategory = asyncHandler(async (req, res) => {
    const { errors } = validateCategory(req.body);
    if (errors) return res.send(errors.details[0].message).status(400);
    const newCategory = await Category.create(req.body);
    res.json(newCategory).sendStatus(200)
})
const updateCategory = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const { error } = validateCategory(req.body)
    if (error) return res.json(error.details[0].message).status(400)
    const result = await Category.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true })
    res.json(result)
})
const deleteCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const deletedCategory = await Category.findByIdAndDelete(id)
    if (!deletedCategory) return res.send('Error deleting Category').status(400)
    res.json(deletedCategory).status(200)
})

module.exports = { getCategoryById, getAllCategories, addCategory, updateCategory, deleteCategoryById }