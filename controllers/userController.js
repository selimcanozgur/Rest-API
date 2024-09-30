import catchAsync from "../utils/catchAsync.js";
import bcryptjs from "bcryptjs";
import AppError from "../utils/apiError.js";
import User from "../models/userModel.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const allUser = await User.find().select("-password");
  res.status(200).json({
    status: true,
    userData: allUser,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      new AppError("Bu kullanıcıyı güncellemenize izin verilmiyor.", 403)
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(new AppError("Şifre en az 6 karakter olmalıdır.", 400));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        new AppError("Kullanıcı adı 7 ila 20 karakter arasında olmalıdır.", 400)
      );
    }
    if (req.body.username.includes(" ")) {
      return next(new AppError("Kullanıcı adı boşluk içeremez.", 400));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(new AppError("Kullanıcı adı küçük harf olmalıdır.", 400));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        new AppError(
          "Kullanıcı adı yalnızca harf ve rakamlardan oluşabilir.",
          400
        )
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
});

export const deleteUser = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(new AppError("Bu kullanıcıyı silmenize izin verilmiyor.", 403));
  }

  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ message: "Hesabınız başarıyla silindi." });
});
