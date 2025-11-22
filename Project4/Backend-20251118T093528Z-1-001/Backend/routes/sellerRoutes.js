const express = require("express");
const { SellerLogin, SellerRegister, AddBook, getBooks } = require("../controllers/SellerControllers");
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Seller routes
router.post("/slogin", SellerLogin);
router.post("/ssignup", SellerRegister);

// ✅ Correct route for adding a book
router.post("/items", authMiddleware, upload.single("itemImage"), AddBook);

// Get seller books
router.get("/getitem/:sellerId", authMiddleware, getBooks);


module.exports = router;
