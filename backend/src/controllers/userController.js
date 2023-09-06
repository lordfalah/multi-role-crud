import ash from "express-async-handler";
import { ServiceUser } from "../service/user-service.js";

const getAllUser = ash(async (req, res) => {
  try {
    const response = await ServiceUser.getAll(req, res);
    res.status(200).json(response);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getUserById = ash(async (req, res) => {
  try {
    const response = await ServiceUser.getById(req, res);
    res.status(200).json(response);
  } catch (error) {
    throw new Error(error.message);
  }
});

const setUser = ash(async (req, res) => {
  try {
    const data = await ServiceUser.created(req, res);
    res
      .status(201)
      .json({ status: "Success", message: "Register Success", data: data });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateUser = ash(async (req, res) => {
  try {
    await ServiceUser.updated(req, res);

    return res
      .status(201)
      .json({ status: "success", message: "success update" });
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const deleteUser = async (req, res) => {
  try {
    await ServiceUser.deleted(req, res);

    return res
      .status(200)
      .json({ status: "success", message: "success delete" });
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
};

export { getAllUser, setUser, updateUser, deleteUser, getUserById };
