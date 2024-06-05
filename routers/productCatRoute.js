const express = require("express");
const router = express.Router();

const { getAllCategories, addCategory, getCategoryById,
    updateCategory, deleteCategoryById } = require("../controllers/productCatCtrl");


router.route("/").get(getAllCategories).post(addCategory);
router.route('/:id').get(getCategoryById).put(updateCategory).delete(deleteCategoryById)

module.exports = router;
