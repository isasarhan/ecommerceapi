const asyncHandler = require("express-async-handler");
const { Blog, validateBlog } = require("../models/blog.js");
const validateMongoDbId = require("../utils/validateMongodbId.js");

const getBlogById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const blog = await Blog.findById(id)
    if (!blog) return res.send('Blog not found').status(404)
    res.json(blog).status(200)
})
const getAllBlogs = asyncHandler(async (req, res) => {
    const blog = await Blog.find()
    res.json(blog)
})
const addBlog = asyncHandler(async (req, res) => {
    const { errors } = validateBlog(req.body);
    if (errors) return res.send(errors.details[0].message).status(400);
    const newBlog = await Blog.create(req.body);
    res.json(newBlog).sendStatus(200)
})
const updateBlog = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const { error } = validateBlog(req.body)
    if (error) return res.json(error.details[0].message).status(400)
    const result = await Blog.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true })
    res.json(result)
})
const deleteBlogById = asyncHandler(async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const deletedBlog = await Blog.findByIdAndDelete(id)
    if (!deletedBlog) return res.send('Error deleting Blog').status(400)
    res.json(deletedBlog).status(200)
})

module.exports = { getBlogById, getAllBlogs, addBlog, updateBlog, deleteBlogById }