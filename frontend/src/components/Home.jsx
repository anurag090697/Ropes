/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaImage } from "react-icons/fa6";
import { createPost } from "../slice";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.ropes);
  const [post, setPost] = useState({ text: "" });

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(user);
    const postData = new FormData();
    postData.append("text", post.text);
    postData.append("picture", post.picture);
    postData.append("postedBy", user._id);
    dispatch(createPost(postData));
  }
//   console.log(post.picture);
  return (
    <div className='flex flex-col gap-1 w-full px-20 py-10 items-center justify-center'>
      <div className='p-8 w-1/2 max-w-full rounded-lg border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <div
          className={`flex items-start justify-between py-6 ${
            user.logged ? "" : "hidden"
          }`}
        >
          <img src={user.displaypicture} alt='' className='rounded-full w-16' />
          <form
            action=''
            className='w-4/5 flex flex-wrap gap-2 items-center'
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type='text'
              value={post.text}
              onChange={(e) =>
                setPost({ ...post, text: e.currentTarget.value })
              }
              placeholder="What's New???"
              className='rounded-lg outline-fuchsia-900 text-center p-1 w-4/5 font-medium bg-gray-600'
            />
            <label htmlFor='fileinput' className=''>
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
              <span className='text-2xl text-lime-300 hover:text-lime-500'>
                <FaImage />
              </span>
            </label>
            <button className='py-1 px-2 bg-fuchsia-900 rounded-lg border shadow-md shadow-gray-900 hover:bg-slate-950 hover:border-fuchsia-700 hover:text-cyan-600'>
              Post
            </button>
          </form>
        </div>
        <hr />
        <div className='flex flex-col items-center justify-center gap-8'></div>
      </div>
    </div>
  );
}

export default Home;
