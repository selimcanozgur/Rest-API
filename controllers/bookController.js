import Book from "../models/bookModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/apiError.js";

const getAllBook = catchAsync(async function (req, res, next) {
  const resultPerPage = 8;
  const bookCount = await Book.countDocuments();
  // Executed
  const apiFeature = new APIFeatures(Book.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const books = await apiFeature.query;

  res.status(200).json({
    status: true,
    bookCount,
    resultPerPage,
    books,
  });
});

const getOneBook = catchAsync(async function (req, res, next) {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new AppError("Bu ID'e ait bir kitap bulunamadı", 404));
  }
  res.status(200).json({
    status: true,
    book,
  });
});

const createBook = catchAsync(async function (req, res, next) {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: true,
    newBook,
  });
});

const updateBook = catchAsync(async function (req, res, next) {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body);
  if (!book) {
    return next(new AppError("Bu ID'e ait bir kitap bulunamadı", 404));
  }
  res.status(200).json({
    status: true,
    book,
  });
});

const deleteBook = catchAsync(async function (req, res, next) {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new AppError("Bu ID'e ait bir kitap bulunamadı", 404));
  }
  res.status(204).json({
    status: true,
    message: "Book Deleted",
  });
});

export { getAllBook, getOneBook, createBook, updateBook, deleteBook };
