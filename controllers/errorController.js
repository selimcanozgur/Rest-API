import APIError from "../utils/apiError.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Sunucu Hatası";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Geçersiz ${err.path} böyle bir kaynak bulunamadı.`;
    err = new APIError(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Yinelenen bir ${Object.keys(err.keyValue)} girildi.`;
    err = new APIError(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Belirteç Geçersiz tekrar deneyin. `;
    err = new APIError(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Belirtecin süresi doldu tekrar deneyiniz. `;
    err = new APIError(message, 400);
  }

  res.status(err.statusCode).json({
    status: false,
    message: err.message,
  });
};
