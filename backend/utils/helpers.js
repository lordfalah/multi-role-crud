import session from "express-session";
import db from "../config/Database.js";
import SequelizeStore from "connect-session-sequelize";

const SessionStore = SequelizeStore(session.Store);

const configCors = {
  origin: "http://localhost:5173/", // Hanya mengizinkan permintaan dari sumber ini
  methods: "GET,POST,DELETE,PUT,PATCH", // Hanya mengizinkan metode GET dan POST
  allowedHeaders: "Content-Type,Authorization", // Hanya mengizinkan header ini
  credentials: true,
};

const myStore = new SessionStore({
  db: db,
});

const configSession = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: myStore,
  saveUninitialized: false,
  cookie: {
    secure: "auto",
  },
};

// myStore.sync();

export { configCors, configSession };
