/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "https://res.cloudinary.com/anurag213/image/upload/v1729103634/ropes/blw47vvvj4augpgy8ewb.jpg" from "../../assets/Profile.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addComment,
  getProfileData,
  getUserPosts,
  likeUnlikePost,
} from "../../slice";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineRepeatOne } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

function PostCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [optmenu, setoptmenu] = useState(false);
  const [commentOpt, setcommentOpt] = useState(false);
  const [msgerr, setmsgerr] = useState({ message: "", error: "" });
  const [newComment, setnewComment] = useState("");
  const { user, responseObj, otherprofile } = useSelector(
    (state) => state.ropes
  );

  useEffect(() => {
    if (responseObj.message || responseObj.error) {
      setTimeout(() => {
        dispatch(clrrsp({}));
      }, 5000);
    }

    setmsgerr(responseObj);
    setTimeout(() => {
      // dispatch(getUserPosts({ userId: user._id }));
      setmsgerr({ message: "", error: "" });
    }, 2000);
  }, [responseObj]);
  //   console.log(otherprofile);

  useEffect(() => {
    if (data.postedBy) {
      dispatch(getProfileData({ userId: data.postedBy }));
    }
  }, []);

  if (!otherprofile[data.postedBy] || !user || !data) {
    return <p className='py-20 text-center text-rose-600'>Loading....</p>;
  }

  return (
    <>
      {" "}
      {/* <div
        className={`${
          msgerr.message || msgerr.error ? "" : "hidden"
        } fixed z-50 w-full font-medium bg-white/50 top-0 h-dvh flex flex-col items-center justify-center text-2xl `}
      >
        <p className='text-lime-400'>{msgerr.message}</p>
        <p className='text-rose-700'>{msgerr.error}</p>
      </div> */}
      <div className='border w-full p-2 rounded-lg border-gray-300'>
        <div className='grid grid-cols-12 items-start'>
          <img
            className='rounded-full w-16 h-16 bg-white object-cover col-span-2'
            src={otherprofile[data.postedBy].displaypicture}
            alt=''
          />
          <div className='col-span-9'>
            <h3>{otherprofile[data.postedBy].name}</h3>
            <p>{data.text}</p>
          </div>

          <div className='relative col-span-1'>
            {" "}
            <button onClick={() => setoptmenu(!optmenu)} className=''>
              <SlOptions />
            </button>
            <span
              className={`absolute bg-white top-4 left-0 text-black rounded-lg border border-gray-800 hover:underline p-1 ${
                optmenu ? "" : "hidden"
              }`}
            >
              Unfollow
            </span>
          </div>
        </div>
        <div className=''>
          <img
            src={data.picture}
            alt=''
            className='my-2 rounded-md border w-full'
          />
          <div className='flex gap-10 text-2xl items-center px-3 py-1'>
            <button
              className='flex items-center gap-2'
              onClick={() =>
                dispatch(
                  likeUnlikePost({
                    userId: user._id,
                    postId: data._id,
                  })
                )
              }
            >
              {data.likes.includes(user._id) ? (
                <span className='text-rose-600'>
                  <FaHeart />
                </span>
              ) : (
                <FaRegHeart />
              )}{" "}
              <span>{data.likes.length}</span>
            </button>
            <button
              className='flex items-center gap-2'
              onClick={() => setcommentOpt(!commentOpt)}
            >
              <FaRegComment /> <span>{data.comments.length}</span>
            </button>
            {/* <button>
          <MdOutlineRepeatOne />
        </button> */}
          </div>
          <div className={`${commentOpt ? "" : "hidden"}`}>
            <div className='relative'>
              <input
                type='text'
                className='w-full text-wrap text-blue-700 rounded-md pr-14 py-1 px-3 h-fit'
                name='comment'
                value={newComment}
                onChange={(e) => setnewComment(e.currentTarget.value)}
              />{" "}
              <button
                onClick={() =>
                  dispatch(
                    addComment({
                      user,
                      text: newComment,
                      postId: data._id,
                    })
                  )
                }
                className={`${
                  commentOpt && newComment ? "" : "hidden"
                } absolute top-0 right-0 bg-slate-700 py-1 px-3 rounded-r-md`}
              >
                Post
              </button>
            </div>
            {data.comments.length > 0
              ? data.comments.map((ele, idx) => {
                  return (
                    <div
                      key={idx}
                      className='flex items-center p-1 justify-start border my-1 rounded-lg'
                    >
                      <img
                        className='w-10 h-10 rounded-full'
                        src={ele.displaypicture}
                        alt=''
                      />{" "}
                      <div className='w-full'>
                        {" "}
                        <h3 className='text-lime-200'>{ele.username}</h3>
                        <p className='bg-gray-600 p-1 rounded-md w-full'>
                          {ele.text}
                        </p>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
