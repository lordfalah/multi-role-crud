import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { configCors, configSession } from "../utils/helpers.js";
import { handleError } from "./middleware/handleError.js";
import { routeUser } from "./routes/UserRoute.js";
import { routeAuth } from "./routes/AuthRoute.js";
import { routeProduct } from "./routes/ProductRoute.js";
// import db from "../config/Database.js";
// import Image from "../models/ImageModel.js";
// import Users from "../models/UserModel.js";
// import Products from "../models/ProductModel.js";

const app = express();

// (async () => {
//   await Users.sync();
//   await Products.sync();
//   await Image.sync();
//   await db.sync();
// })();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.static("public"));
app.use(cookieParser());
app.use(session(configSession));
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,DELETE,PUT,PATCH",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(import.meta.url, "public")));

// route user
routeUser(app);
// route auth
routeAuth(app);
// route product
routeProduct(app);

app.use(handleError);

export default app;
