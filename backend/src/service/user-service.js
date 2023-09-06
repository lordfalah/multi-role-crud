import argon2 from "argon2";
import Users from "../models/UserModel.js";

const getAll = async (req, res) => {
  const response = await Users.findAll({
    attributes: ["uuid", "name", "email", "role"],
  });

  return response;
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: id,
    },
  });

  if (!response || response === null) {
    res.status(404);
    throw new Error("user not found");
  }
  return response;
};

const created = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password and Confirm Password not match");
  }

  const hashPassword = await argon2.hash(password);
  return await Users.create({
    name,
    email,
    role,
    password: hashPassword,
  });
};

const updated = async (req, res) => {
  const { id } = req.params;
  const { name, password, confirmPassword, role } = req.body;

  const user = await Users.findOne({
    where: {
      uuid: id,
    },
  });

  // check data is exist
  if (user === null || !user) {
    res.status(400);
    throw new Error("data not found");
  }

  let hashPassword = "";

  // validate password
  if (password === "" || !password) {
    hashPassword = user.password;
  } else {
    if (!(await argon2.verify(user.password, password))) {
      res.status(400);
      throw new Error("password doesn't match");
    }
    hashPassword = await argon2.hash(confirmPassword);
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password and Confirm Password not match");
  }

  // update user
  return await Users.update(
    { name, password: hashPassword, role },
    {
      where: {
        id: user.id,
      },
    }
  );
};

const deleted = async (req, res) => {
  const { id } = req.params;

  const user = await Users.findOne({
    where: {
      uuid: id,
    },
  });

  // check data is exist
  if (user === null || !user) {
    res.status(400);
    throw new Error("data not found");
  }

  return await Users.destroy({
    where: {
      id: user.id,
    },
  });
};

export const ServiceUser = { getAll, getById, created, updated, deleted };
