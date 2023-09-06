import { Sequelize, DataTypes } from "sequelize";
import db from "../../config/Database.js";
import Users from "./UserModel.js";

const Product = db.define(
  "product",
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

    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNul: false,
      validate: {
        notEmpty: true,
        isInt: true,
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNul: false,
      validate: {
        isInt: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Product);
Product.belongsTo(Users, { foreignKey: "userId" });

export default Product;
