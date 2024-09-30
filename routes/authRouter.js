import express from "express";
import {
  login,
  signup,
  logout,
  googleAuth,
} from "../controllers/authController.js";

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/google", googleAuth);
Router.post("/logout", logout);

export default Router;
