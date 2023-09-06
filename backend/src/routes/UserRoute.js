import express from "express";
import {
  deleteUser,
  getAllUser,
  setUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

const routeUser = (app) => {
  router.get("/", getAllUser);
  router.get("/:id", getUserById);
  router.post("/", setUser);
  router.put("/:id", updateUser);
  router.delete("/:id", deleteUser);

  app.use("/users", verifyUser, adminOnly, router);
};

export { routeUser };
