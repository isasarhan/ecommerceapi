const express = require("express");
const asyncHandler = require("express-async-handler");

const { addProduct, getAllProducts, updateProduct, deleteProductById, getProductById } = require("../controllers/productCtrl");
const router = express.Router();

router.route("/").get(getAllProducts).post(addProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProductById)

module.exports = router;
