import express from "express";
import bookRouter from "./routes/bookRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import errorController from "./controllers/errorController.js";
import AppError from "./utils/apiError.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({ path: "./config/.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} böyle bir sayfa bulunamadı`, 404));
});

app.use(errorController);

export default app;
