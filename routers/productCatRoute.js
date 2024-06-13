const express = require("express");
const router = express.Router();

const { getAllCategories, addCategory, getCategoryById,
    updateCategory, deleteCategoryById } = require("../controllers/productCatCtrl");
const { uploadPhoto } = require("../middlewares/uploadMiddleware");


router.route("/").get(getAllCategories).post(uploadPhoto.single('file'),addCategory);
router.route('/:id').get(getCategoryById).put(updateCategory).delete(deleteCategoryById)

module.exports = router;
