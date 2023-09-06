import { Sequelize, DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Users = db.define(
  "users",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNul: false,
      validate: {
        notEmpty: true,
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNul: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNul: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNul: false,
      validate: {
        notEmpty: true,
      },
    },

    role: {
      type: DataTypes.STRING,
      allowNul: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
