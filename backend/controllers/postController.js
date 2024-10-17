/** @format */

import { postModel } from "../models/postModel.js";
import { userModel } from "../models/userModel.js";
import { uploadImage } from "../services/uploadToCloudinary.js";

export async function createNewPost(req, res) {
  try {
    const { postedBy, text } = req.body;
    // console.log(postedBy);
    const finduser = await userModel.findById(postedBy);
    if (!finduser) {
      return res.status(401).json({ message: "", error: "user not found" });
    }
    // console.log(req.file);
    let picU = "";
    if (req.file) {
      picU = await uploadImage(req);
      //   console.log(picU);
    }
    const newPost = new postModel({
      postedBy: finduser._id,
      text: text,
      picture: picU,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "", error: error });
  }
}

export async function getUserPosts(req, res) {
  try {
    const { userId } = req.params;
    // console.log(userId);
    const finduser = await userModel.findById(userId);
    if (!finduser) {
      return res.status(401).json({ message: "", error: "user not found" });
    }
    const allposts = await postModel.find({ postedBy: userId });

    res.status(200).json(allposts);
  } catch (error) {
    //   console.log('first')
    res.status(500).json({ message: "", error: error });
  }
}

export async function likeUnlikePost(req, res) {
  try {
    const { userId, postId } = req.body;

    const findpost = await postModel.findById(postId);
    const findUser = await userModel.findById(userId);
    if (!findpost || !userId) {
      return res.status(401).json({ message: "", error: "Post not found" });
    }
    const userLiked = findpost.likes.includes(userId);
    //  console.log({ userId, postId });
    if (userLiked) {
      await postModel.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(201).json({ message: "Post UnLiked", error: "" });
    } else {
      findpost.likes.push(userId);
      await findpost.save();
      res.status(201).json({ message: "Post Liked", error: "" });
    }
  } catch (error) {
    res.status(500).json({ message: "", error: error });
  }
}

export async function newComment(req, res) {
  try {
    const { text, postId, user } = req.body;
    const finpost = await postModel.findById(postId);
    if (!finpost) {
      return res.status(401).json({ message: "", error: "Post not found" });
    }
    const comment = {
      userId: user._id,
      displaypicture: user.displaypicture,
      text,
      username: user.username,
    };
    finpost.comments.push(comment);
    await finpost.save();
    res.status(201).json({ message: "Comment added", error: "" });
  } catch (error) {
    res.status(500).json({ message: "", error: error });
  }
}
