const express = require('express');
const { getAllCarts, addCart, getCartById, updateCart, deleteCartById, getCartByUserId } = require('../controllers/cartCtrl');
const router = express.Router()

router.route('/user/:id').get(getCartByUserId)
router.route('/:id').get(getCartById).put(updateCart).delete(deleteCartById)
router.route("/").get(getAllCarts).post(addCart);
module.exports = router