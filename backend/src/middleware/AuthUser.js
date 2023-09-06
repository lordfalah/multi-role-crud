import ash from "express-async-handler";
import Users from "../models/UserModel.js";

const verifyUser = ash(async (req, res, next) => {
  if (!req.session.userId) {
    res.status(401);
    throw new Error("Please login your account");
  }

  const user = await Users.findOne({
    where: { uuid: req.session.userId },
  });

  if (!user || user === null) {
    res.status(400);
    throw new Error("User not found");
  }

  req.userId = user.id;
  req.role = user.role;
  next();
});

const adminOnly = ash(async (req, res, next) => {
  const user = await Users.findOne({
    where: { uuid: req.session.userId },
  });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.role !== "admin") {
    res.status(403);
    throw new Error("Access Unauthorized");
  }

  next();
});

export { verifyUser, adminOnly };
