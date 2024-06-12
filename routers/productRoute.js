const express = require("express");

const { addProduct, getAllProducts, updateProduct, deleteProductById, getProductById } = require("../controllers/productCtrl");
const { uploadPhoto } = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/upload", uploadPhoto.single('file'), async(req,res)=>{
    console.log(req.file);
    res.send("image")
})
router.route("/").get(getAllProducts).post(uploadPhoto.single('file'), addProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProductById)

module.exports = router;
