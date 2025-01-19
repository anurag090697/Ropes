/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ROPES_API,
  withCredentials: true,
});

export const registerNewUser = createAsyncThunk(
  "ropes/registerNewUser",
  async (data, { rejectwithvalue }) => {
    try {
      const response = await axiosInstance.post("/signup", data);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response.data);
      return error.response.data;
    }
  }
);

export const userLogin = createAsyncThunk(
  "ropes/userLogin",
  async ({ email, password }, { rejectwithvalue }) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });
      Cookies.set("ropes_token1", response.data.token, { expires: 10 });
      // console.log(response.data.token, Cookies.get("ropes"));
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const alreadyLogged = createAsyncThunk(
  "ropes/alreadyLogged",
  async ({}, { rejectWithValue }) => {
    try {
      const ropes_token = Cookies.get("ropes_token1");
      // console.log(ropes_token);
      if (ropes_token) {
        // console.log('hehe')
        const response = await axiosInstance.post("/alreadyLogged", {
          ropes_token: ropes_token,
        });

        return response.data;
      } else {
        const response = await axiosInstance.post("/alreadyLogged", {});
        return response.data;
      }

      // console.log(Cookies.get("ropes_token1"));
    } catch (error) {
      //   console.log(error);
      return error.response.data;
    }
  }
);

export const userLogout = createAsyncThunk(
  "ropes/userLogout",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/logoutUser", {});
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error)
      return error.response.data;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "ropes/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/updateUserData", formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error)
      return error.response.data;
    }
  }
);

export const createPost = createAsyncThunk(
  "ropes/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/createPost", postData);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "ropes/getUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      let tm = userId.userId;
      const response = await axiosInstance.get(`/getUser/post/` + tm);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const likeUnlikePost = createAsyncThunk(
  "ropes/likeUnlikePost",
  async ({ userId, postId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/likeUnlikepost", {
        postId,
        userId,
      });
      // console.log({ userId, postId });
      if (response.data.message != "Post Liked") return response.data;
      return { userId, postId };
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addComment = createAsyncThunk(
  "ropes/addComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addNewComment", { ...data });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getSuggestedUsers = createAsyncThunk(
  "ropes/getSuggestedUsers",
  async ({ userId }, { rejectWithValue }) => {
    try {
      // console.log(userId);
      const response = await axiosInstance.get("/suggestedUsers/" + userId);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const followUnfollowUser = createAsyncThunk(
  "ropes/followUnfollowUser",
  async ({ userId, targetId }) => {
    try {
      const response = await axiosInstance.post("/followUnfollowUser", {
        userId,
        targetId,
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getNewsFeed = createAsyncThunk(
  "ropes/getNewsFeed",
  async ({ userId }, { rejectWithValue }) => {
    try {
      // console.log(userId);
      const response = await axiosInstance.get("/getnewsFeed/" + userId);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getProfileData = createAsyncThunk(
  "ropes/getProfileData",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/getProfile/" + userId);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deletePost = createAsyncThunk(
  "ropes/deletePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      console.log({ postId });
      const response = await axiosInstance.delete("/deletepost/" + postId);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const searchuser = createAsyncThunk(
  "ropes/searchuser",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/searchUser/" + query);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getConversation = createAsyncThunk(
  "ropes/getConversation",
  async ({ sender, recipient }, { rejectWithValue }) => {
    try {
      // console.log(recipient, sender);
      if (recipient) {
        const response = await axiosInstance.get(
          `/getConversations?sender=${sender}&recipient=${recipient}`
        );
        // console.log(response);
        return response.data;
      } else {
        const response = await axiosInstance.get(
          `/getConversations?sender=${sender}`
        );
        // console.log(response);
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  }
);

export const clrrsp = createAsyncThunk(
  "ropes/clrrsp",
  async ({}, { rejectWithValue }) => {
    return { message: "", error: "" };
  }
);

const ropesSlice = createSlice({
  name: "ropes",
  initialState: {
    user: { logged: false },
    registerUser: { message: "", error: "" },
    responseObj: { message: "", error: "" },
    userPosts: [],
    userfeed: [],
    suggestedUsers: [],
    otherprofile: {},
    searchusers: [],
    conversations: [],
    status: "idle",
    error: "null",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registerUser = action.payload;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.error = "failed";
        state.registerUser = action.payload;
      })
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        // state.responseObj = {message:}
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = "failed";
        // state.user = action.payload;
      })
      .addCase(alreadyLogged.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(alreadyLogged.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(alreadyLogged.rejected, (state, action) => {
        state.error = "failed";
        // state.user = action.payload;
      })
      .addCase(userLogout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.error = "failed";
        // state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responseObj = action.payload;
        // setTimeout(() => {
        //   state.responseObj = { message: "", error: "" };
        // }, 5000);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(getUserPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(likeUnlikePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(likeUnlikePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        let temp = state.userfeed;
        const { userId, postId } = action.payload;
        temp.forEach((element) => {
          if (element._id == postId) {
            element.likes.push(userId);
          }
        });
        state.userfeed = temp;
      })
      .addCase(likeUnlikePost.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(addComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responseObj = action.payload;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(getSuggestedUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSuggestedUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suggestedUsers = action.payload;
      })
      .addCase(getSuggestedUsers.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(followUnfollowUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(followUnfollowUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responseObj = action.payload;
      })
      .addCase(followUnfollowUser.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(getNewsFeed.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getNewsFeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userfeed = action.payload;
      })
      .addCase(getNewsFeed.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(getProfileData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.status = "succeeded";
        let tm = action.payload;
        let temp = state.otherprofile;
        let uname = tm._id;
        temp[uname] = tm;
        state.otherprofile = temp;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responseObj = action.payload;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(searchuser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchuser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchusers = action.payload;
      })
      .addCase(searchuser.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(getConversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.error = "failed";
        state.responseObj = action.payload;
      })
      .addCase(clrrsp.fulfilled, (state, action) => {
        state.responseObj = action.payload;
      });
  },
});

export const ropesReducer = ropesSlice.reducer;
