import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = async (req, res) => {
  res.send("Api working");
};

export const updateUser = async (req, res, next) => {
  console.log(req.user);

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  // Object to hold fields that need updating
  const updateFields = {};

  // Password validation and hashing
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    updateFields.password = bcryptjs.hashSync(req.body.password, 10);
  }

  // Username validation
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
    updateFields.username = req.body.username;
  }

  // Optionally update email and profile picture if provided
  if (req.body.email) updateFields.email = req.body.email;
  if (req.body.profilePicture)
    updateFields.profilePicture = req.body.profilePicture;

  try {
    // Updating the user with validated and optional data
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateFields },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Return the updated user without the password
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log(req.params.userId);
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this account")
    );
  }

  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found")); // Handle case where user does not exist
    }
    res.status(200).json("User has been deleted successfully");
  } catch (error) {
    next(error);
  }
};
