const bcrypt = require("bcryptjs");
const Seller = require('../models/Seller/SellerSchema');
const Book = require("../models/Seller/BookSchema");
const MyOrders = require('../models/Users/MyOrders');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ----------------------- SELLER LOGIN -----------------------
const SellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(401).json({ status: "fail", msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({ status: "fail", msg: "Invalid email or password" });
    }

    const token = generateToken(seller._id);

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.json({
      status: "success",
      token,
      user: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "fail", msg: "Server Error" });
  }
};


// ----------------------- SELLER REGISTER -----------------------
const SellerRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  try {
    const exists = await Seller.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "Already have an account" });
    }

    

    const newSeller = await Seller.create({
      name,
      email,
      password
    });

    const token = generateToken(newSeller._id);

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      status: "success",
      msg: "Account created successfully",
      user: { id: newSeller._id, name: newSeller.name, email: newSeller.email },
      token,
    });

  } catch (err) {
    console.error("🔥 REGISTER ERROR:", err);
    return res.status(500).json({ msg: "Signup failed" });
  }
};

// ----------------------- ADD BOOK -----------------------


const AddBook = async (req, res) => {
  const { title, author, genre, description, price, sellerId } = req.body;
  const itemImage = req.file?.path; // multer file path

  if (!title || !author || !genre || !price || !sellerId || !itemImage) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      description,
      price,
      sellerId, // must be string
      itemImage,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("AddBook ERROR:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
};





// ----------------------- GET BOOKS -----------------------
const getBooks = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const books = await Book.find({ sellerId }).sort('position');
    return res.json(books);
  } catch (err) {
    console.error('🔥 Error fetching books:', err);
    return res.status(500).json({ error: 'Failed to fetch items' });
  }
};


// ----------------------- DELETE BOOK -----------------------
const deleteBooks = async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);
    return res.sendStatus(200);

  } catch (err) {
    console.error("🔥 DELETE ERROR:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// ----------------------- GET SELLER ORDERS -----------------------
const getSellerOrders = async (req, res) => {
  try {
    const orders = await MyOrders.find({ sellerId: req.params.userId }).sort('position');
    return res.json(orders);

  } catch (err) {
    console.error("🔥 GET ORDERS ERROR:", err);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
  SellerLogin,
  SellerRegister,
  AddBook,
  getBooks,
  deleteBooks,
  getSellerOrders
};
