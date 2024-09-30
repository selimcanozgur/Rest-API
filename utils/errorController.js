export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Sunucu Hatası";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
