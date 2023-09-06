import multer from "multer";
import path from "path";
import { access, constants } from "node:fs/promises";
import { cwd } from "node:process";
import { mkdir } from "node:fs/promises";
const { randomBytes } = await import("node:crypto");
import ash from "express-async-handler";
import Product from "../models/ProductModel.js";
import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadDir = "public/uploads";

    try {
      await access(`${cwd()}/${uploadDir}`, constants.R_OK | constants.W_OK);
    } catch (error) {
      const projectFolder = new URL(`${cwd()}/${uploadDir}`, import.meta.url);
      await mkdir(projectFolder, {
        recursive: true,
      });
    }
    cb(null, `./${uploadDir}`);
  },
  filename: function (req, file, cb) {
    const hash = randomBytes(16).toString("hex");
    cb(null, file.fieldname + "-" + hash + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  const allowedFileTypes = [".png", ".jpg", ".jpeg"];

  const extname = path.extname(file.originalname);
  if (allowedFileTypes.includes(extname.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, JPG, and JPEG files are allowed"));
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batasan ukuran file (5MB)
});

const errorMulter = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error
  } else if (err instanceof Error) {
    // General error
    return res.status(415).json({ message: err.message });
  }
  next();
};

const handleErrorUpload = ash(async (req, res, next) => {
  try {
    if (req.file && req.role === "user") {
      const product = await Product.findOne({
        where: { uuid: req.params.id },
      });

      if (product) {
        if (req.userId !== product.userId) {
          if (existsSync(`${cwd()}/${req.file.path}`)) {
            await unlink(`${cwd()}/${req.file.path}`);
          }
        }
      }
    }

    next();
  } catch (error) {
    throw new Error(error.message);
  }
});

export { upload, handleErrorUpload, errorMulter };
