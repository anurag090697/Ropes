/** @format */

import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

// console.log(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, callback) => {
    const filename = `${Date.now()} - ${Math.round(Math.random() * 1000000)}`;
    const ext = `${path.extname(file.originalname)}`;
    callback(null, filename + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2, files: 1 },
});

export default upload;

// import path from "path";
// import multer from "multer";
// import { fileURLToPath } from "url";
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const uploadDir = path.join(__dirname, "../uploads");

// // Ensure upload directory exists
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, uploadDir);
//   },
//   filename: (req, file, callback) => {
//     const filename = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
//     const ext = path.extname(file.originalname);
//     callback(null, filename + ext);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // Increased to 5MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
//   },
// });

// export default upload;
