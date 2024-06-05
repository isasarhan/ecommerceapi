const asyncHandler = require("express-async-handler");
const { BlogCategory, validateBlogCat } = require("../models/blogCat.js");
const validateMongoDbId = require("../utils/validateMongoDbId");

const getBlogCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const blogCategory = await BlogCategory.findById(id)
    if (!blogCategory) return res.send('BlogCategory not found').status(404)
    res.json(blogCategory).status(200)
})
const getAllBlogCategories = asyncHandler(async (req, res) => {
    const blogCategory = await BlogCategory.find()
    res.json(blogCategory)
})
const addBlogCategory = asyncHandler(async (req, res) => {
    const { errors } = validateBlogCat(req.body);
    if (errors) return res.send(errors.details[0].message).status(400);
    const newBlogCategory = await BlogCategory.create(req.body);
    res.json(newBlogCategory).sendStatus(200)
})
const updateBlogCategory = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const { error } = validateBlogCat(req.body)
    if (error) return res.json(error.details[0].message).status(400)
    const result = await BlogCategory.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true })
    res.json(result)
})
const deleteBlogCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const deletedBlogCategory = await BlogCategory.findByIdAndDelete(id)
    if (!deletedBlogCategory) return res.send('Error deleting BlogCategory').status(400)
    res.json(deletedBlogCategory).status(200)
})

module.exports = { getBlogCategoryById, getAllBlogCategories, addBlogCategory, updateBlogCategory, deleteBlogCategoryById }