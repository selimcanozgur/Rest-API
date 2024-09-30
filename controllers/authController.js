import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import apiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const SendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    user,
  });
};

// Signup
export const signup = catchAsync(async function (req, res, next) {
  const { name, email, password, profilePicture, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    profilePicture,
    role,
  });
  SendToken(user, 201, req, res);
});

// Login
export const login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new apiError("E-Posta ve şifreyi giriniz", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new apiError("Geçersiz e-posta veya şifre", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new apiError("Geçersiz e-posta veya şifre", 401));
  }
  SendToken(user, 200, req, res);
});

export const googleAuth = async function (req, res, next) {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      SendToken(user, 200, req, res);
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
      SendToken(user, 200, req, res);
    }
  } catch (error) {
    next(error);
  }
};

// Logout
export const logout = async function (req, res, next) {
  try {
    res.clearCookie("jwt").status(200).json("Çıkış yapıldı");
  } catch (error) {
    next(error);
  }
};
