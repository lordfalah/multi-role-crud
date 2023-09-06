import express from "express";
import { logOut, login, me } from "../controllers/Auth.js";

const router = express.Router();

const routeAuth = (app) => {
  router.get("/me", me);
  router.post("/login", login);
  router.delete("/logout", logOut);

  app.use("/", router);
};

export { routeAuth };
