const User = require("../models/Users/UserSchema");
const Book = require("../models/Seller/BookSchema");
const MyOrders = require("../models/Users/MyOrders");
const WishlistItem = require("../models/Users/Wishlist");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ========================
// Helper: Generate JWT
// ========================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ========================
// LOGIN USER
// ========================
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during login" });
  }
};

// ========================
// SIGNUP USER
// ========================
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Account already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      msg: "Account created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Signup failed" });
  }
};

// ========================
// ITEMS
// ========================
const getItems = async (req, res) => {
  try {
    const items = await Book.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch items" });
  }
};

const getSingleItem = async (req, res) => {
  try {
    const item = await Book.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};



// ========================
// ORDERS
// ========================
const createUserOrder = async (req, res) => {
  try {
    const order = new MyOrders(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ msg: "Failed to create order" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await MyOrders.find({ userId: req.params.userId }).sort("position");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch orders" });
  }
};

// ========================
// WISHLIST
// ========================
const getWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistItem.find();
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch wishlist" });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistItem.find({ userId: req.params.userId }).populate("bookId");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch user wishlist" });
  }
};

const addWishlistItem = async (req, res) => {
  try {
    const { userId, bookId, title, itemImage, userName } = req.body;

    if (!userId || !bookId) return res.status(400).json({ msg: "Missing userId or bookId" });

    // Convert to ObjectId
    const newUserId = mongoose.Types.ObjectId(userId);
    const newBookId = mongoose.Types.ObjectId(bookId);

    // Check if item already exists
    const exists = await WishlistItem.findOne({ userId: newUserId, bookId: newBookId });
    if (exists) return res.status(400).json({ msg: "Item already in wishlist" });

    const item = new WishlistItem({
      userId: newUserId,
      bookId: newBookId,
      title,
      itemImage: itemImage.replace(/\\/g, '/'), // normalize path
      userName,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to add wishlist item" });
  }
};

const removeWishlistItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    await WishlistItem.findByIdAndDelete(itemId);
    res.status(200).json({ msg: "Item removed from wishlist" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to remove wishlist item" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getItems,
  getSingleItem,
  createUserOrder,
  getUserOrders,
  getWishlist,
  getUserWishlist,
  addWishlistItem,
  removeWishlistItem,
};
