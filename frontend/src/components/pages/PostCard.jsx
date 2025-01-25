/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addComment,
  clrrsp,
  followUnfollowUser,
  getProfileData,
  getUserPosts,
  likeUnlikePost,
} from "../../slice";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
// import { MdOutlineRepeatOne } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

function PostCard({ pdata }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(pdata);
  const [optmenu, setoptmenu] = useState(false);
  const [commentOpt, setcommentOpt] = useState(false);
  const [msgerr, setmsgerr] = useState({ message: "", error: "" });
  const [newComment, setnewComment] = useState("");
  // const [postdata, setpostdata] = useState({});

  const { user, responseObj, otherprofile } = useSelector(
    (state) => state.ropes
  );

  // useEffect(() => {
  //   if (responseObj.message || responseObj.error) {
  //     setTimeout(() => {
  //       dispatch(clrrsp({}));
  //     }, 5000);
  //   }

  //   // setmsgerr(responseObj);
  //   setTimeout(() => {
  //     // dispatch(getUserPosts({ userId: user._id }));
  //     setmsgerr({ message: "", error: "" });
  //   }, 2000);
  // }, [responseObj]);
  //   console.log(otherprofile);

  useEffect(() => {
    if (data.postedBy) {
      dispatch(getProfileData({ userId: data.postedBy }));
      // setpostdata(data);
    }
  }, []);
  // console.log(postdata);
  if (!otherprofile[data.postedBy] || !user || !data) {
    return <p className='py-20 text-center text-rose-600'>Loading....</p>;
  }

  function addnewcomment({ user, text, postId }) {
    dispatch(
      addComment({
        user,
        text,
        postId,
      })
    );
    let tm = data.comments;
    // console.log(typeof tm);
    let tm1 = {
      text: newComment,
      userId: user._id,
      displaypicture: user.displaypicture,
      username: user.username,
    };
    tm = [...tm, tm1];
    setData((prev) => ({ ...prev, comments: tm }));
    setnewComment("");
  }

  function changeLikeUnlike() {
    dispatch(
      likeUnlikePost({
        userId: user._id,
        postId: data._id,
      })
    );
    const idx = data.likes.indexOf(user._id);
    console.log(idx);
    let temp;
    if (idx === -1) {
      temp = [...data.likes, user._id];
    } else {
      temp = data.likes.filter((ele) => ele != user._id);
      // temp = data.likes.splice(idx, 1);
    }
    setData((prev) => ({ ...prev, likes: temp }));
  }

  function getTimeAgo(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffInMs = now - date;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  }

  function openProfile() {
    dispatch(getUserPosts({ userId: data.postedBy }));
    // console.log(data.postedBy);
    setTimeout(() => {
      navigate("/otherprofile/" + otherprofile[data.postedBy].username, {
        state: { data: otherprofile[data.postedBy] },
      });
    }, 500);
  }

  return (
    <>
      {" "}
      <div
        className={`${
          msgerr.message || msgerr.error ? "" : "hidden"
        } fixed z-40 w-full font-medium bg-white/50 top-0 h-dvh flex flex-col items-center justify-center text-2xl `}
      >
        <p className='text-lime-400'>{msgerr.message}</p>
        <p className='text-rose-700'>{msgerr.error}</p>
      </div>
      <div className='border-t md:border w-full bg-slate-600 py-1 md:p-2 md:rounded-lg border-gray-300'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center justify-start gap-4 p-1'>
            <img
              className='rounded-full w-12 h-12 bg-white object-cover'
              src={otherprofile[data.postedBy].displaypicture}
              alt=''
              onClick={() =>
                navigate(
                  "/otherprofile/" + otherprofile[data.postedBy].username,
                  { state: { data: otherprofile[data.postedBy] } }
                )
              }
            />
            <div className='flex flex-col items-start'>
              <h3
                className='text-sky-300 hover:text-cyan-400 cursor-pointer'
                onClick={() => openProfile()}
              >
                {otherprofile[data.postedBy].name}
              </h3>
              <p className='text-gray-300'>{data.text}</p>
            </div>
          </div>
          <div className='relative p-1'>
            {" "}
            <button onClick={() => setoptmenu(!optmenu)} className=''>
              <SlOptions />
            </button>
            <span
              onClick={() =>
                dispatch(
                  followUnfollowUser({
                    userId: user._id,
                    targetId: data.postedBy,
                  })
                )
              }
              className={`absolute bg-white top-5 right-0 text-sm md:text-lg text-black rounded-lg border border-gray-800 hover:underline p-1 ${
                optmenu ? "" : "hidden"
              }`}
            >
              {user.following.includes(data.postedBy) ? "Unfollow" : "Follow"}
            </span>
          </div>
        </div>
        <div className=''>
          <img
            src={data.picture}
            alt=''
            className='my-2 md:rounded-md md:border w-full'
          />

          <div className='flex gap-10 text-2xl items-center px-3 py-1'>
            <button
              className='flex items-center gap-2'
              onClick={() => changeLikeUnlike()}
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

          {data.createdAt ? (
            <p className='p-2 text-xs text-gray-400 font-medium '>
              {getTimeAgo(data.createdAt)}
            </p>
          ) : (
            <p className='p-2 text-xs text-gray-400 font-medium '>
              A while ago
              {/* {getTimeAgo(data.updatedAt)} */}
            </p>
          )}
          <div className={`${commentOpt ? "" : "hidden"}`}>
            <div className='relative'>
              <input
                type='text'
                className='w-full text-wrap text-blue-700 md:rounded-md pr-14 py-1 px-3 h-fit'
                name='comment'
                value={newComment}
                placeholder='Enter to add a comment....'
                onChange={(e) => setnewComment(e.currentTarget.value)}
              />{" "}
              <button
                onClick={() =>
                  addnewcomment({
                    user,
                    text: newComment,
                    postId: data._id,
                  })
                }
                className={`${
                  commentOpt && newComment ? "" : "hidden"
                } absolute top-0 right-0 bg-slate-700 py-1 px-3 rounded-r-md`}
              >
                Post
              </button>
            </div>
            {data.comments && data.comments.length > 0
              ? data.comments.map((ele, idx) => {
                  return (
                    <div
                      key={idx}
                      className='flex items-center gap-1 p-1 justify-start md:border md:my-1 md:rounded-lg'
                    >
                      <img
                        className='w-10 h-10 rounded-full'
                        src={ele.displaypicture}
                        alt=''
                      />{" "}
                      <div className='w-full'>
                        {" "}
                        <h3 className='text-lime-200'>{ele.username}</h3>
                        <p className='bg-gray-600 p-1 rounded-md w-full border border-slate-800'>
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
