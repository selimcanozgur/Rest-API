import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lütfen isminizi giriniz."],
    maxlength: [30, "Maksimum 30 karakter girebilirsiniz"],
    minlength: [4, "En az 4 karakterden oluşmalı"],
  },
  email: {
    type: String,
    required: [true, "E-Posta girmek zorunludur."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Doğru bir e-posta adresi giriniz"],
  },

  password: {
    type: String,
    required: [true, "Parolanızı belirtiniz"],
    minlength: 8,
    select: false,
  },
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Kullanıcının oluşturduğu şifre ile hash edilen şifreyi eşledik.

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
