import ash from "express-async-handler";
import Users from "../models/UserModel.js";
import argon2 from "argon2";

const login = ash(async (req, res) => {
  const user = await Users.findOne({ where: { email: req.body.email } });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const { uuid, name, email, role, password } = user;

  //validate password
  if (!(await argon2.verify(password, req.body.password))) {
    res.status(400);
    throw new Error("wrong password");
  }

  req.session.userId = uuid;
  return res.status(200).json({ uuid, name, email, role });
});

const me = ash(async (req, res) => {
  if (!req.session.userId) {
    res.status(401);
    throw new Error("Please login your account");
  }

  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: { uuid: req.session.userId },
  });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  return res.status(200).json(user);
});

const logOut = ash(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400);
      throw new Error("Can't logout");
    }

    return res.status(200).json({ message: "You are logout" });
  });
});

export { login, logOut, me };
