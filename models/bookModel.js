import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Lütfen kitap adı giriniz."],
    trim: true,
    unique: true,
  },
  author: {
    type: String,
    required: [true, "Lütfen yazar ismi giriniz."],
    trim: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  pages: {
    type: Number,
    required: [true, "Lütfen sayfa sayısını giriniz."],
  },
  summary: {
    type: String,
    required: [true, "Lütfen kitap özetini giriniz."],
    trim: true,
  },
  bookType: {
    type: String,
    reqired: [true, "Kitap türünü giriniz"],
    trim: true,
    default: "İnce Kapak",
  },
  publishYear: {
    type: Number,
    required: [true, "Baskı yılını giriniz."],
  },
  dimensions: {
    type: String,
    required: [true, "Kitap ebatlarını giriniz."],
    trim: true,
  },
  bookLanguage: {
    type: String,
    reqired: [true, "Kitabını dilini belirtiniz"],
    default: "Türkçe",
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Lütfen kitabın fiyatını giriniz."],
  },
  images: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Book = mongoose.model("book", bookSchema);

export default Book;
