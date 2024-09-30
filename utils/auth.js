import User from "../models/userModel.js";
import catchAsync from "./catchAsync.js";
import apiError from "./apiError.js";
import jwt from "jsonwebtoken";

// Kullanıcı kimliği doğrulama
const isAuthenticatedUser = catchAsync(async function (req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new apiError("Bu alana erişebilmek için giriş yapın", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

const authorizeRoles = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new apiError(`${roles} yetkisine sahip değilsiniz`, 403));
    }
    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
