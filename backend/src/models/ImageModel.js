import { Sequelize, DataTypes } from "sequelize";
import db from "../../config/Database.js";
import Product from "./ProductModel.js";

const Image = db.define(
  "image",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNul: false,
      validate: {
        notEmpty: true,
      },
    },

    url: {
      type: DataTypes.STRING,
      allowNul: true,
      validate: {
        notEmpty: true,
      },
    },

    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNul: false,
      unique: true,
      validate: {
        isInt: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Product.hasMany(Image);
Image.belongsTo(Product, { foreignKey: "productId" });

export default Image;
