const express = require("express");
const { User } = require("../models/user");
const { register, login, deleteUser, getUser, getAllUsers } = require("../controllers/userCtrl");
const router = express.Router();


router.post('/register', register)
router.post('/login', login)
router.route('/:id').get(getUser).delete(deleteUser)
router.route("/").get(getAllUsers)

module.exports = router;
