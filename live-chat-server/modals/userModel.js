const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { // Changed from firstName to name
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // To ensure no duplicate emails
    },
  },
  {
    timestamps: true, // Enabled timestamp tracking
  }
);

// No need for password methods or password hashing middleware

const User = mongoose.model("User", userModel);
module.exports = User;
