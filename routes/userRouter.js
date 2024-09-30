import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";
import { isAuthenticatedUser, authorizeRoles } from "../utils/auth.js";

const Router = express.Router();

Router.route("/update/:userId").put(isAuthenticatedUser, updateUser);
Router.route("/delete/:userId").delete(isAuthenticatedUser, deleteUser);

// -- Admin
Router.route("/allUsers").get(
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);
export default Router;
