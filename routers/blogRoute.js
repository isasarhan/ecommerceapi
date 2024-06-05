const express = require('express');
const { getAllBlogs, addBlog, getBlogById, updateBlog, deleteBlogById } = require('../controllers/blogCtrl');
const router = express.Router()

router.route("/").get(getAllBlogs).post(addBlog);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlogById)

module.exports = router