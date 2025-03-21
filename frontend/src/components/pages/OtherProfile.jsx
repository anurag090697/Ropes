/** @format */

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { followUnfollowUser, getUserPosts } from "../../slice";
import PostCard from "./PostCard";
import LoaderBox from "../common/LoaderBox";

function OtherProfile() {
  const location = useLocation();
  const { data } = location.state || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userPosts, responseObj } = useSelector((state) => state.ropes);
  const topviewRef = useRef(null);
  useEffect(() => {
    //   if (data._id) {
    //     // console.log("first");
    //     dispatch(getUserPosts({ userId: data._id }));
    //   }
    //   // console.log(userPosts.length);
    scrollTotop();
  }, []);

  const scrollTotop = () => {
    topviewRef.current?.scrollIntoView({ behavior: "instant" });
  };

  if (!data || !user.logged) {
    return <LoaderBox></LoaderBox>
  }

  return (
    <div className='flex flex-col md:gap-1 w-full md:px-20 md:py-10 items-center justify-center'>
      <div ref={topviewRef}></div>
      <div className='p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full md:rounded-lg border-y md:border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <div className='flex items-center justify-between'>
          <div className='text-center font-medium pt-2'>
            <h1 className='md:text-2xl'>{data.name}</h1>
            <h2 className='text-xl text-amber-400'>{data.username}</h2>
          </div>

          <img
            className='w-32 h-32 object-cover rounded-full border'
            src={data.displaypicture}
            alt=''
          />
        </div>
        <div className='flex gap-2'>
          <button
            className='border-2 p-1 rounded-lg my-2 hover:bg-sky-400'
            onClick={() =>
              dispatch(
                followUnfollowUser({ userId: user._id, targetId: data._id })
              )
            }
          >
            {user.following.includes(data._id) ? "Unfollow " : "Follow +"}
          </button>
          <button
            className='border-2 p-1 rounded-lg my-2 hover:bg-violet-400'
            onClick={() =>
              navigate("/messages", {
                state: { sender: user._id, recipient: data._id },
              })
            }
          >
            Message
          </button>
        </div>{" "}
        <p>{data.bio}</p>
        <p className='text-gray-300'>{data.followers.length} Followers</p>
      </div>
      <div className=' md:p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full md:rounded-lg md:border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <h2 className='text-xl text-center'>Posts</h2>
        <div className='flex flex-col items-center justify-center md:gap-4 md:p-2'>
          {userPosts.length > 0 ? (
            userPosts.map((ele, idx) => {
              return <PostCard key={idx} pdata={ele}></PostCard>;
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

export default OtherProfile;

// const [optmenu, setoptmenu] = useState(null);
// const [commentOpt, setcommentOpt] = useState(null);
// const [msgerr, setmsgerr] = useState({ message: "", error: "" });
// const [newComment, setnewComment] = useState("");
// console.log(data);
// useEffect(() => {
//   setmsgerr(responseObj);
//   setTimeout(() => {
//     // dispatch(getuserPosts({ dataId: data._id }));
//     setmsgerr({ message: "", error: "" });
//   }, 2000);
// }, [responseObj]);

/* <div
        className={`${
          msgerr.message || msgerr.error ? "" : "hidden"
        } fixed z-50 w-full font-medium bg-white/50 top-0 h-dvh flex flex-col items-center justify-center text-2xl `}
      >
        <p className='text-lime-400'>{msgerr.message}</p>
        <p className='text-rose-700'>{msgerr.error}</p>
      </div> */
