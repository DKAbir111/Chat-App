const generateToken = require("../Config/generateToken");
const UserModel = require("../modals/userModel");
const expressAsyncHandler = require("express-async-handler");

// Login Controller
const loginController = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  // Find user by email
  const user = await UserModel.findOne({ email });
  if (user) {
    // Create response without password check
    const response = {
      _id: user._id,
      name: user.name, // Changed from firstName to name
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    res.json(response);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// Registration Controller
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, lastName, email } = req.body; // Changed firstName to name

  // Check for all fields
  if (!name || !lastName || !email) {
    res.status(400);
    throw new Error("All necessary input fields have not been filled");
  }

  // Check for existing user by email
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(405);
    throw new Error("User already exists");
  }

  // Create a new user entry in the DB
  const user = await UserModel.create({ name, lastName, email }); // Changed firstName to name
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name, // Changed from firstName to name
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration error");
  }
});

// Fetch All Users Controller
const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } }, // Changed from firstName to name
        { lastName: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

  // Exclude the logged-in user from results
  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = {
  loginController,
  registerController,
  fetchAllUsersController,
};
