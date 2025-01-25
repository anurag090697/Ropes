/** @format */

import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import upload from "../middlewares/imageUpload.js";

export async function uploadImage(req, res) {
  // upload.single("url");
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_USERNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  // console.log(process.env.CLOUDINARY_API_USERNAME);
  try {
    const picture = await cloudinary.uploader.upload(req.file.path, {
      folder: "ropes",
    });
    return picture.secure_url;
  } catch (error) {
    // return res.send({
    //   error: "There was an error uploading the image try again",
    // });
    console.log(error);
  }
}
