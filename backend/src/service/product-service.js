import db from "../../config/Database.js";
import Image from "../models/ImageModel.js";
import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { cwd } from "node:process";
import { Op } from "sequelize";
import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";
import path from "path";

const getAll = async (req, res) => {
  let response;
  if (req.role === "admin") {
    response = await Products.findAll({
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          attributes: [
            "id",
            "uuid",
            "url",
            "filename",
            "filePath",
            "fileSize",
            "productId",
          ],
          model: Image,
        },
      ],
    });
  } else {
    response = await Products.findAll({
      where: {
        userId: req.userId,
      },

      include: [
        {
          attributes: ["name", "email"],
          model: Users,
        },
        {
          attributes: [
            "id",
            "uuid",
            "url",
            "filename",
            "filePath",
            "fileSize",
            "productId",
          ],
          model: Image,
        },
      ],
    });
  }

  return response;
};

const getById = async (req, res) => {
  const product = await Products.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (product === null || !product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let response;

  if (req.role === "admin") {
    response = await Products.findOne({
      where: {
        id: product.id,
      },
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          model: Image,
          attributes: ["url", "filename", "fileSize"],
        },
      ],
    });
  } else {
    if (req.userId !== product.userId) {
      res.status(403);
      throw new Error("Access Unauthorized");
    }

    response = await Products.findOne({
      where: {
        [Op.and]: [{ id: product.id }, { userId: req.userId }],
      },
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          model: Image,
          attributes: ["url", "filename", "fileSize", "filePath"],
        },
      ],
    });
  }

  return response;
};

const created = async (req, res) => {
  const { name, price } = req.body;
  if (!req.file) {
    res.status(400);
    throw new Error("No image file provided");
  }

  const { filename, originalname, path, size } = req.file;
  const protocol = req.protocol;
  const host = req.get("host");

  return await Products.create(
    {
      name,
      price,
      userId: req.userId,

      images: {
        url: `${protocol}://${host}/uploads/${filename}`,
        filename: originalname,
        filepath: path,
        fileSize: size,
      },
    },
    {
      include: [Image],
    }
  );
};

const deleted = async (req, res) => {
  const product = await Products.findOne({
    where: {
      uuid: req.params.id,
    },
    include: {
      model: Image,
    },
  });

  if (!product || product === null) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (req.role === "admin") {
    const imgFilePath = product.images[0].filepath;
    const filePath = path.resolve(imgFilePath);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    await Products.destroy({
      where: {
        id: product.id,
      },
    });
  } else {
    if (req.userId !== product.userId) {
      res.status(403);
      throw new Error("Access Unauthorized");
    }

    const imgFilePath = product.images[0].filepath;
    const filePath = path.resolve(imgFilePath);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    await Products.destroy({
      where: {
        [Op.and]: [{ id: product.id }, { userId: req.userId }],
      },
      include: {
        model: Users,
      },
    });
  }
};

const updated = async (req, res) => {
  const product = await Products.findOne({
    where: { uuid: req.params.id },
    include: [{ model: Image }],
  });

  if (!product || product === null) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, price } = req.body;

  if (req.role === "admin") {
    let currentData = {
      products: {},
      images: {},
    };

    if (!req.file) {
      const { url, filename, filePath, fileSize } = product.images[0];
      currentData = {
        products: { name, price },
        images: { url, filename, filePath, fileSize },
      };
    } else {
      const { filename, originalname, path, size } = req.file;
      const protocol = req.protocol;
      const host = req.get("host");

      // delete file img
      const imgFilePath = product.images[0].filepath;
      if (existsSync(`${cwd()}/${imgFilePath}`)) {
        await unlink(`${cwd()}/${imgFilePath}`);
      }

      currentData = {
        products: { name, price },
        images: {
          url: `${protocol}://${host}/uploads/${filename}`,
          filename: originalname,
          filepath: path,
          fileSize: size,
        },
      };
    }

    await db.transaction(async (t) => {
      await Products.update(currentData.products, {
        where: {
          id: product.id,
        },
        transaction: t,
      });

      await Image.update(currentData.images, {
        where: {
          productId: product.id,
        },
        transaction: t,
      });
    });

    return currentData;
  } else {
    if (req.userId !== product.userId) {
      res.status(403);
      throw new Error("Access Unauthorized");
    }

    let currentData = {
      products: {},
      images: {},
    };
    if (!req.file) {
      const { url, filename, filePath, fileSize } = product.images[0];
      currentData = {
        products: { name, price },
        images: { url, filename, filePath, fileSize },
      };
    } else {
      const { filename, originalname, path, size } = req.file;
      const protocol = req.protocol;
      const host = req.get("host");

      // delete file img
      const imgFilePath = product.images[0].filepath;
      if (existsSync(`${cwd()}/${imgFilePath}`)) {
        await unlink(`${cwd()}/${imgFilePath}`);
      }

      currentData = {
        products: { name, price },
        images: {
          url: `${protocol}://${host}/uploads/${filename}`,
          filename: originalname,
          filepath: path,
          fileSize: size,
        },
      };
    }

    await db.transaction(async (t) => {
      await Products.update(currentData.products, {
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
          },
          {
            model: Image,
          },
        ],
        transaction: t,
      });

      await Image.update(currentData.images, {
        where: {
          productId: product.id,
        },
        include: [
          {
            where: {
              userId: req.userId,
            },
            model: Products,
          },
        ],
        transaction: t,
      });
    });
    return currentData;
  }
};

export const ServiceProduct = { getById, getAll, created, deleted, updated };
