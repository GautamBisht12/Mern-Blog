import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(500)
        .json({ message: "All fields are required", success: false });
      // next(errorHandler(400, "All fields are required"));
    }

    const isUserAlreadyExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(500).json({
        message: "User with same username or email already exist",
        success: false,
      });

      // next(errorHandler(400, "User with same username or email already exist"));
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const newUser = await User.findById(user?._id).select("-password");
    if (!newUser) {
      res
        .status(500)
        .json({ message: "Something went wrong while registering user" });
      // next(errorHandler(500, "Something went wrong while registering user"));
    }

    return res.json({
      message: "User Sign up Successfully",
      newUser,
      success: true,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return next(errorHandler(400, "All fields are required"));
    }
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Invalid credentials");
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const checkPassword = await user.isPasswordCorrect(password);

    if (!checkPassword) {
      console.log("Password is incorrect");
      return res
        .status(500)
        .json({ message: "Password or Email is incorrect", success: false });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // to remove password from user
    const { password: pass, ...rest } = user._doc;

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        message: "User Login Successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.log("Error in login controller", error.message);
    next(errorHandler(500, error.message));
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  console.log(name, "Received");
  console.log(email, "Received");
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
