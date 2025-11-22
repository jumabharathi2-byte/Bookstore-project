const express = require("express");
const { loginUser, signupUser, getItems, getSingleItem, createUserOrder, getUserOrders, getUserWishlist, getWishlist, addWishlistItem, removeWishlistItem } = require("../controllers/UsersController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router()

router.post("/login", loginUser);
router.post("/signup", signupUser);

// Items
// Items
router.get("/item", getItems);        // GET all items
router.get("/item/:id", getSingleItem); // GET single item by ID


// Orders
router.post("/userorder", authMiddleware, createUserOrder);
router.get("/getorders/:userId", authMiddleware, getUserOrders);

// Wishlist
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/wishlist/:userId", authMiddleware, getUserWishlist);
router.post("/wishlist/add", authMiddleware, addWishlistItem);
router.post("/wishlist/remove", authMiddleware, removeWishlistItem);


module.exports = router;
