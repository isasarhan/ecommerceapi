const asyncHandler = require("express-async-handler");
const { User, validateUser } = require("../models/user.js");


const register = asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.send(error.details[0].message).status(400)

    const findUser = await User.findOne({ email: req.body.email })
    if (findUser) throw new Error("User Already Exists");

    const user = new User(req.body)
    const result = await user.save()
    res.json(result).status(200)
})

const login = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user && !(await user.isPasswordMatched(req.body.password))) return res.send('Invalid Email or Password')
    const token = user.generateToken()
    res.json({
        user: {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            isBlocked: user.isBlocked,
            address: user.address,
        },
        token: token
    }).status(200)
})
const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) throw new Error('User not found!')
    res.json(user)
})
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
})
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    const deletedUser = await User.findByIdAndDelete(id)
    if (deletedUser === null) throw new Error('User not found!')
    res.json(deletedUser).status(200)
})

module.exports = { register, login, deleteUser, getUser, getAllUsers }