const express = require('express');
const { addBlogCategory, getBlogCategoryById, updateBlogCategory, deleteBlogCategoryById, getAllBlogCategories } = require('../controllers/blogCatCtrl');
const router = express.Router()

router.route("/").get(getAllBlogCategories).post(addBlogCategory);
router.route('/:id').get(getBlogCategoryById).put(updateBlogCategory).delete(deleteBlogCategoryById)

module.exports = router