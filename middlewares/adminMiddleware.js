const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler((req, res, next) => {
    if (!req.user.role === "admin") return res.send('Access Denied!').status(400);
    next()
})


module.exports = { isAdmin }