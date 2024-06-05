const express = require('express');
const { getAllOrders, addOrder, getOrderById, updateOrder, deleteOrderById } = require('../controllers/orderCtrl');
const router = express.Router()


router.route("/").get(getAllOrders).post(addOrder);
router.route('/:id').get(getOrderById).put(updateOrder).delete(deleteOrderById)


module.exports = router