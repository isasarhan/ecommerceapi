const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");

const auth = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.secretKey)
            res.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authirized! Token failed.");
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized! No Token");
    }
})

module.exports = { auth }