/** @format */
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { generatojwtToken } from "../services/jwtToken.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { uploadImage } from "../services/uploadToCloudinary.js";

export async function userSignup(req, res) {
  try {
    const { name, email, username, password } = req.body;
    const safePassword = await bcrypt.hash(password, 11);
    const newUser = new userModel({
      name,
      email,
      username,
      password: safePassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "user registered successfully.", error: "" });
  } catch (error) {
    res.status(500).json({ error: "an error occured try again", message: "" });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email }).exec();
    if (!findUser) {
      return res.status(404).json({ message: "", error: "user not found" });
    }
    const matchPassword = await bcrypt.compare(password, findUser.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "", error: "Incorrect Password" });
    } else {
      const newtoken = generatojwtToken(findUser);
      let temp = findUser._doc;
      delete temp.password;
      res
        .cookie("ropes_token", newtoken, {
          httpOnly: true,
          sameSite: "strict",
          Secure:true,
          maxAge: 10 * 24 * 60 * 60 * 1000, //10days
        })
        .status(202)
        .json({ ...temp, logged: true });
    }
  } catch (error) {
    res.status(500).json({ error: "an error occured try again", message: "" });
  }
}

export async function alreadyLoogedUser(req, res) {
  try {
    const { ropes_token } = req.cookies;
    // console.log("first");
    const verifyToken = jwt.verify(ropes_token, process.env.JWT_SECRET);
    if (!ropes_token || !verifyToken) {
      return res.send("");
    }
    const userData = await userModel.findById(verifyToken.userId);
    if (!userData) {
      return res.status(404).json({ message: "", error: "user not found" });
    }
    res.status(202).json({ ...userData._doc, logged: true });
  } catch (error) {
    res.status(500).json({
      error: "an error occured try again",
      message: "",
      logged: false,
    });
  }
}

export function userLogout(req, res) {
  try {
    res.clearCookie("ropes_token", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successfully", logged: false });
  } catch (error) {
    res
      .status(500)
      .json({ message: "", error: "An error occured please try again" });
  }
}

export async function updateProfile(req, res) {
  try {
    const formData = req.body;
    const user = await userModel.findOne({ email: formData.email });
    if (!user) {
      return res.status(401).json({ message: "", error: "user not found" });
    }
    let picU = "";
    if (req.file) {
      picU = await uploadImage(req);
    }
    if (picU) {
      user.displaypicture = picU;
    }
    user.bio = formData.bio;
    await user.save();
    res.status(202).json({ ...user, logged: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "", error: "An error occured please try again" });
  }
}

export async function getSuggestedProfiles(req, res) {
  try {
    const { userId } = req.params;
    // console.log(userId);
    const finduser = await userModel.findById(userId);
    if (!finduser) {
      return res.status(401).json({ message: "", error: "user not found" });
    }
    const allusers = await userModel.aggregate([
      {
        $match: {
          username: { $ne: finduser.username },
        },
      },
    ]);

    let followedUsers = finduser.following;
    const finalUsers = allusers.filter(
      (ele) => !followedUsers.includes(ele._id)
    );
    res.status(200).json(finalUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "", error: "An error occured please try again" });
  }
}

export async function updateFollowing(req, res) {
  try {
    const { userId, targetId } = req.body;
    // console.log({ userId, targetId });
    const finduser = await userModel.findById(userId);
    const findtarget = await userModel.findById(targetId);
    if (!finduser || !findtarget) {
      return res.status(401).json({ message: "", error: "user not found" });
    }
    const followed = finduser.following.includes(targetId);
    if (followed) {
      await userModel.findByIdAndUpdate(targetId, {
        $pull: { followers: userId },
      });
      await userModel.findByIdAndUpdate(userId, {
        $pull: { following: targetId },
      });
      return res.status(201).json({ message: "User Unfollowed", error: "" });
    } else {
      await userModel.findByIdAndUpdate(targetId, {
        $push: { followers: userId },
      });
      await userModel.findByIdAndUpdate(userId, {
        $push: { following: targetId },
      });
      return res.status(201).json({ message: "User followed", error: "" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "", error: "An error occured please try again" });
  }
}
