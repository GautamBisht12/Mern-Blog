import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }

    const isUserAlreadyExist = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExist) {
      next(
        errorHandler(400, "User with same username and email already exist")
      );
    }

    if (password.length < 8) {
      next(errorHandler(400, "Password must be 8 characters"));
    }
    const user = await User.create({
      username,
      email,
      password,
    });

    const newUser = await User.findById(user?._id);
    if (!newUser) {
      next(errorHandler(500, "Something went wrong while registering user"));
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    next(errorHandler(500, error.message));
  }
};

export const login = async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email) {
    next(errorHandler(400, "All fields are required"));
  } 

  const userExist = await  User.findOne({$and:[{username} , {email}]})

};
