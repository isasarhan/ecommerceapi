const express = require('express');
const { getAllCarts, addCart, getCartById, updateCart, deleteCartById } = require('../controllers/cartCtrl');
const router = express.Router()

router.route("/").get(getAllCarts).post(addCart);
router.route('/:id').get(getCartById).put(updateCart).delete(deleteCartById)

module.exports = router