/** @format */

import express from "express";
import {
  alreadyLoogedUser,
  getOtherProfile,
  getSuggestedProfiles,
  searchuser,
  updateFollowing,
  updateProfile,
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/userController.js";
import { uploadImage } from "../services/uploadToCloudinary.js";
import upload from "../middlewares/imageUpload.js";
import {
  createNewPost,
  deletePost,
  getUserFeed,
  getUserPosts,
  likeUnlikePost,
  newComment,
} from "../controllers/postController.js";
import { getChats, sendMsg } from "../controllers/messageController.js";

const ropesRouter = express.Router();

// ropesRouter.get("/some", (req, res) => {
//   res.send("luhuhuhuhh");
// });
ropesRouter.post("/signup", userSignup);
ropesRouter.post("/login", userLogin);
ropesRouter.get("/alreadyLogged", alreadyLoogedUser);
ropesRouter.post("/logoutUser", userLogout);
ropesRouter.post(
  "/updateUserData",
  upload.single("displaypicture"),
  updateProfile
);
ropesRouter.get("/searchUser/:query", searchuser);

ropesRouter.post("/createPost", upload.single("picture"), createNewPost);
ropesRouter.get("/getUser/post/:userId", getUserPosts);
ropesRouter.put("/likeUnlikepost", likeUnlikePost);
ropesRouter.post("/addNewComment", newComment);
ropesRouter.get("/suggestedUsers/:userId", getSuggestedProfiles);
ropesRouter.post("/followUnfollowUser", updateFollowing);
ropesRouter.get("/getnewsFeed/:userId", getUserFeed);
ropesRouter.get("/getProfile/:userId", getOtherProfile);
ropesRouter.delete("/deletepost/:postId", deletePost);
ropesRouter.get("/getConversations", getChats);
ropesRouter.post("/sendmsg", sendMsg);
// ropesRouter.post(
//   "/updateUserData",
//   upload.single("displaypicture"),
//   async (req, res) => {
//     try {
//       const url = await uploadImage(req);
//       console.log(url);
//       res.send(url);
//     } catch (error) {
//       res.send("error");
//     }
//   }
// );
export default ropesRouter;
