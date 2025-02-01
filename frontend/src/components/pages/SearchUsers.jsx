/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clrrsp,
  followUnfollowUser,
  searchuser,
  getSuggestedUsers,
  getUserPosts,
} from "../../slice";
import { useNavigate } from "react-router";

function SearchUsers() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setquery] = useState("");
  const { searchusers, user, responseObj, suggestedUsers } = useSelector(
    (state) => state.ropes
  );
  const dispatch = useDispatch();
  const [msgerr, setmsgerr] = useState({ message: "", error: "" });

  function handlesubmit(e) {
    e.preventDefault();
    if (query) {
      dispatch(searchuser({ query }));
      setquery("");
    } else {
      alert("Query too short");
    }
  }
  useEffect(() => {
    if (responseObj.message || responseObj.error) {
      alert(responseObj.message || responseObj.error);
      setTimeout(() => {
        dispatch(clrrsp({}));
      }, 5000);
    }
  }, [responseObj]);

  useEffect(() => {
    if (user.logged) {
      dispatch(getSuggestedUsers({ userId: user._id }));
    }
  }, [user]);

  function openProfile(ele) {
    dispatch(getUserPosts({ userId: ele._id }));
    // console.log(ele);
    setTimeout(() => {
      navigate(`/otherprofile/${ele.username}`, {
        state: { data: ele },
      });
    }, 500);
  }

  return (
    <div className='flex flex-col md:gap-1 w-full md:px-20 md:py-10 items-center justify-center'>
      <div
        className={`${
          msgerr.message || msgerr.error ? "" : "hidden"
        } fixed z-50 w-full font-medium bg-white/50 top-0 h-dvh flex flex-col items-center justify-center text-2xl `}
      >
        <p className='text-lime-400'>{msgerr.message}</p>
        <p className='text-rose-700'>{msgerr.error}</p>
      </div>

      <div className='p-3 md:p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full md:rounded-lg md:border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <form
          action=''
          className='flex items-center justify-center gap-1 sm:gap-4'
          onSubmit={(e) => handlesubmit(e)}
        >
          <input
            type='text'
            onChange={(e) => setquery(e.currentTarget.value)}
            value={query}
            placeholder='Enter Name or Username...'
            className='p-1 sm:py-2 sm:px-4 rounded-lg border-2 border-lime-500 outline-cyan-400 text-black'
          />{" "}
          <button className='bg-lime-400 font-medium border sm:text-xl p-1 sm:py-2 sm:px-4 rounded-xl text-white shadow-md shadow-lime-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all'>
            Search
          </button>
        </form>
        <div className='flex flex-wrap gap-3 px-1 py-3 md:p-6 items-center justify-center'>
          {searchusers.length ? (
            searchusers.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className='border flex items-center justify-center gap-1 md:gap-6 border-sky-500 p-2 rounded-md w-80'
                >
                  <img
                    className='w-24 h-24 md:w-40 md:h-40 object-cover rounded-full'
                    src={ele.displaypicture}
                    alt=''
                  />{" "}
                  <div className='flex flex-col items-center gap-4 justify-center cursor-pointer w-1/2 text-lg md:text-xl'>
                    <h2
                      className='text-center cursor-pointer'
                      onClick={() => openProfile(ele)}
                    >
                      {ele.name}
                    </h2>
                    <button
                      onClick={() =>
                        dispatch(
                          followUnfollowUser({
                            userId: user._id,
                            targetId: ele._id,
                          })
                        )
                      }
                      className={`border-2 p-1 md:p-2 rounded-lg hover:bg-gray-300 hover:text-green-800 hover:border-green-800 text-sm md:text-xl ${
                        ele.username === user.username ? "hidden" : ""
                      }`}
                    >
                      {user.following.includes(ele._id)
                        ? "Unfollow"
                        : " Follow +"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className='text-center w-full my-20 bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text text-4xl animate-bounce'>
              No Users Found
            </p>
          )}
        </div>
      </div>
      <div className='p-3 md:p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full md:rounded-lg border-t md:border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <h1 className='text-2xl text-center'>Suggested Profiles</h1>
        <div className='flex flex-wrap gap-1 md:gap-4 items-center justify-center py-6'>
          {suggestedUsers.length ? (
            suggestedUsers.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className='border flex items-center flex-row justify-center gap-6 border-sky-500 p-2 rounded-md w-80'
                >
                  <img
                    className='w-24 h-24 md:w-40 md:h-40 object-cover rounded-full'
                    src={ele.displaypicture}
                    alt=''
                  />{" "}
                  <div className='flex flex-col items-center justify-center gap-4 w-1/2 text-lg md:text-xl'>
                    <h2
                      className=' text-center'
                      onClick={() => openProfile(ele)}
                    >
                      {ele.name}
                    </h2>
                    <button
                      onClick={() =>
                        dispatch(
                          followUnfollowUser({
                            userId: user._id,
                            targetId: ele._id,
                          })
                        )
                      }
                      className={`border-2 p-2 rounded-lg hover:bg-gray-300 hover:text-green-800 hover:border-green-800 ${
                        ele.username == user.username ? "hidden" : ""
                      }`}
                    >
                      Follow +
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className='text-center w-full animate-bounce my-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-emerald-300 to-rose-600 text-transparent bg-clip-text text-4xl'>
              No Users Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUsers;
