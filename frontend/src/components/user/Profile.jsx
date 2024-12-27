/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "https://res.cloudinary.com/anurag213/image/upload/v1729103634/ropes/blw47vvvj4augpgy8ewb.jpg" from "../../assets/Profile.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addComment,
  deletePost,
  getUserPosts,
  likeUnlikePost,
} from "../../slice";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineRepeatOne } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userPosts, responseObj } = useSelector((state) => state.ropes);
  const [optmenu, setoptmenu] = useState(null);
  const [commentOpt, setcommentOpt] = useState(null);
  const [msgerr, setmsgerr] = useState({ message: "", error: "" });
  const [newComment, setnewComment] = useState("");

  useEffect(() => {
    let userId = user._id;
    if (userId) dispatch(getUserPosts({ userId }));
    // console.log(user._id);
  }, [user]);

  useEffect(() => {
    setmsgerr(responseObj);
    if (responseObj.message || responseObj.error) {
      setTimeout(() => {
        dispatch(clrrsp({}));
      }, 5000);
    }
    setTimeout(() => {
      // dispatch(getUserPosts({ userId: user._id }));
      setmsgerr({ message: "", error: "" });
    }, 2000);
  }, [responseObj]);

  // console.log(userPosts);
  if (!user.logged) {
    return (
      <div className='w-full h-dvh flex items-center justify-center text-2xl gap-3 text-gray-200'>
        <NavLink to='/login' className='hover:text-lime-400'>
          Login{" "}
        </NavLink>{" "}
        <span>or</span>{" "}
        <NavLink to='/signup' className='hover:text-sky-400'>
          Signup
        </NavLink>
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-1 w-full px-4 md:px-20 md:py-10 items-center justify-center'>
      <div
        className={`${
          msgerr.message || msgerr.error ? "" : "hidden"
        } fixed z-50 w-full font-medium bg-white/50 top-0 h-dvh flex flex-col items-center justify-center text-2xl `}
      >
        <p className='text-lime-400'>{msgerr.message}</p>
        <p className='text-rose-700'>{msgerr.error}</p>
      </div>
      <div className='p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full rounded-lg border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <div className='flex items-start justify-between'>
          <div className='text-center font-medium pt-2'>
            <h1 className='text-2xl'>{user.name}</h1>
            <h2 className='text-xl'>{user.username}</h2>
          </div>
          <img
            className='w-32 h-32 object-cover rounded-full border'
            src={user.displaypicture}
            alt=''
          />
        </div>
        <p>{user.bio}</p>
        <p className='text-gray-300'>{user.followers.length} Followers</p>
        <button
          onClick={() => navigate(`/editprofile/${user.username}`)}
          className='w-full border rounded-md my-2 bg-blue-950 py-1 hover:text-gray-300'
        >
          Edit Profile
        </button>
      </div>
      <div className='p-1 sm:p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full rounded-lg border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <h2 className='text-xl text-center'>Posts</h2>
        <div className='flex flex-col items-center justify-center gap-4 p-2'>
          {userPosts.length > 0 ? (
            userPosts.map((ele, idx) => {
              return (
                <div
                  className='border w-full p-2 rounded-lg border-gray-300'
                  key={idx}
                >
                  <div className='grid grid-cols-12 items-start'>
                    <img
                      className='rounded-full w-16 h-16 object-cover col-span-2'
                      src={user.displaypicture}
                      alt=''
                    />
                    <div className='col-span-9'>
                      <h3>{user.name}</h3>
                      <p>{ele.text}</p>
                    </div>

                    <div className='relative col-span-1'>
                      {" "}
                      <button
                        onClick={() => setoptmenu(optmenu === idx ? null : idx)}
                        className=''
                      >
                        <SlOptions />
                      </button>
                      <span
                        className={`absolute bg-white top-4 left-0 text-black rounded-lg border border-gray-800 hover:underline p-1 ${
                          optmenu === idx ? "" : "hidden"
                        }`}
                        onClick={() => {
                          user._id === ele.postedBy
                            ? dispatch(
                                deletePost({
                                  postId: ele._id,
                                  postedBy: user._id,
                                })
                              )
                            : "";
                        }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                  <div className=''>
                    <img
                      src={ele.picture}
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
                              postId: ele._id,
                            })
                          )
                        }
                      >
                        {ele.likes.includes(user._id) ? (
                          <span className='text-rose-600'>
                            <FaHeart />
                          </span>
                        ) : (
                          <FaRegHeart />
                        )}{" "}
                        <span>{ele.likes.length}</span>
                      </button>
                      <button
                        className='flex items-center gap-2'
                        onClick={() =>
                          setcommentOpt(commentOpt === idx ? null : idx)
                        }
                      >
                        <FaRegComment /> <span>{ele.comments.length}</span>
                      </button>
                      {/* <button>
                        <MdOutlineRepeatOne />
                      </button> */}
                    </div>
                    <div className={`${commentOpt === idx ? "" : "hidden"}`}>
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
                                postId: ele._id,
                              })
                            )
                          }
                          className={`${
                            commentOpt === idx && newComment ? "" : "hidden"
                          } absolute top-0 right-0 bg-slate-700 py-1 px-3 rounded-r-md`}
                        >
                          Post
                        </button>
                      </div>
                      {ele.comments.length > 0
                        ? ele.comments.map((ele, idx) => {
                            return (
                              <div
                                key={idx}
                                className='flex items-center p-1 justify-start border my-1 rounded-lg'
                              >
                                <img
                                  className='w-10 rounded-full'
                                  src={ele.displaypicture}
                                  alt=''
                                />{" "}
                                <div className='w-full'>
                                  {" "}
                                  <h3 className='text-lime-200'>
                                    {ele.username}
                                  </h3>
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
              );
            })
          ) : (
            <p className='text-2xl text-rose-600 text-center'>
              No Post To Show
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
