/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
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
      // console.log("first");
      const response = await axiosInstance.get("/alreadyLogged", {});
      // console.log(response);
      return response.data;
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
      return response.data;
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

const ropesSlice = createSlice({
  name: "ropes",
  initialState: {
    user: { logged: false },
    registerUser: { message: "", error: "" },
    responseObj: { message: "", error: "" },
    userPosts: [],
    suggestedUsers: [],
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
        state.responseObj = action.payload;
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
        state.responseObj = action.payload;
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
      });
  },
});

export const ropesReducer = ropesSlice.reducer;
