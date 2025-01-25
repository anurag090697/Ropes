/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaImage } from "react-icons/fa6";
import { clrrsp, createPost, getNewsFeed } from "../slice";
import PostCard from "./pages/PostCard";
import { useNavigate } from "react-router";
import Login from "./user/Login";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userfeed, responseObj } = useSelector((state) => state.ropes);
  const [post, setPost] = useState({ text: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (post.picture && post.picture.size > 2097152) {
      alert("Image size more than 2mb not supported.");
      return;
    }
    // console.log(user);
    if (post.text || post.picture) {
      const postData = new FormData();
      postData.append("text", post.text);
      postData.append("picture", post.picture);
      postData.append("postedBy", user._id);
      dispatch(createPost(postData));
      setPost({ text: "" });
    } else {
      alert("You need to write something first");
    }
  }

  useEffect(() => {
    if (responseObj.message || responseObj.error) {
      // alert(responseObj.message || responseObj.error);
      setTimeout(() => {
        dispatch(clrrsp({}));
      }, 5000);
    }

    // console.log(responseObj);
  }, [responseObj]);

  useEffect(() => {
    if (user.logged) {
      dispatch(getNewsFeed({ userId: user._id }));
    } else {
      return navigate("/login");
    }
  }, [user]);
  // console.log(post.picture);
  if (!user.logged) {
    return <Login />;
  }
  return (
    <div className='flex flex-col gap-1 w-full md:px-20 md:py-2 items-center justify-center'>
      <div
        className={`${
          responseObj.message || responseObj.error ? "" : "hidden"
        } fixed z-50 w-full font-medium bg-white/50 top-0 h-dvh flex flex-col items-center justify-center text-2xl `}
      >
        <p className='text-lime-400'>{responseObj.message}</p>
        <p className='text-rose-700'>{responseObj.error}</p>
      </div>
      <div className='md:p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full md:rounded-lg border-2 min-h-dvh text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <div
          className={`flex items-center justify-center gap-2 md:justify-between py-2 sm:py-6 ${
            user.logged ? "" : "hidden"
          }`}
        >
          <img
            src={user.displaypicture}
            alt='dp'
            className='rounded-full w-16 h-16 object-cover'
          />
          <form
            action=''
            className='w-2/3 md:w-4/5 flex gap-2 items-center'
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type='text'
              value={post.text}
              onChange={(e) =>
                setPost({ ...post, text: e.currentTarget.value })
              }
              placeholder="What's New???"
              className='rounded-lg outline-none text-center p-1 w-4/5 font-medium bg-gray-600 ring-2 ring-transparent focus:ring-violet-400'
            />
            <label htmlFor='fileinput' className='relative'>
              <input
                type='file'
                accept='image/*'
                name=''
                id='fileinput'
                className='hidden'
                onChange={(e) =>
                  setPost({ ...post, picture: e.currentTarget.files[0] })
                }
              />
              <span className='text-3xl text-lime-300 hover:text-lime-500'>
                <FaImage />
              </span>
              <span
                className={`${
                  post.picture ? "" : "hidden"
                } absolute font-bold text-xs top-0 right-0 rounded-full bg-rose-500 h-4 w-4 text-center`}
              >
                1
              </span>
            </label>
            <button className='py-1 px-2 bg-fuchsia-900 rounded-lg border shadow-md shadow-gray-900 hover:bg-slate-950 hover:border-fuchsia-700 hover:text-cyan-600'>
              Post
            </button>
          </form>
        </div>
        <hr />
        <div className='flex flex-col items-center justify-center md:gap-8 relative'>
          <h1 className='text-2xl sm:text-3xl py-2 text-cyan-400'>NewsFeed</h1>
          <div className='flex flex-col md:gap-2 items-center justify-center'>
            {userfeed.length ? (
              userfeed.map((ele, idx) => {
                return <PostCard key={idx} pdata={ele} user={user}></PostCard>;
              })
            ) : (
              <p className='text-rose-400 text-2xl my-20'>No Posts to Show</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
