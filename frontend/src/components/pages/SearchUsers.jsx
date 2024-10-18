/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser, searchuser } from "../../slice";

function SearchUsers() {
  const [query, setquery] = useState("");
  const { searchusers, user } = useSelector((state) => state.ropes);
  const dispatch = useDispatch();

  function handlesubmit(e) {
    e.preventDefault();
    if (query) {
      dispatch(searchuser({ query }));
      setquery("");
    } else {
      alert("Query too short");
    }
  }

  return (
    <div className='flex flex-col gap-1 w-full px-20 py-10 items-center justify-center'>
      <div className='p-8 w-1/2 max-w-full rounded-lg border-2 min-h-dvh text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <form
          action=''
          className='flex items-center justify-center gap-4'
          onSubmit={(e) => handlesubmit(e)}
        >
          <input
            type='text'
            onChange={(e) => setquery(e.currentTarget.value)}
            value={query}
            placeholder='Enter Name or Username...'
            className='py-2 px-4 rounded-lg border-2 border-lime-500 outline-cyan-400 text-black'
          />{" "}
          <button className='bg-lime-400 font-medium border text-xl py-2 px-4 rounded-xl text-white shadow-md shadow-lime-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all'>
            Search
          </button>
        </form>
        <div className='flex flex-col gap-3 py-5 px-6 items-center justify-center'>
          {searchusers.length ? (
            searchusers.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className='border flex items-center justify-start gap-6 border-sky-500 p-2 rounded-md w-full'
                >
                  <img
                    className='w-40 h-40 object-center rounded-full'
                    src={ele.displaypicture}
                    alt=''
                  />{" "}
                  <div className='flex flex-col items-start gap-4 justify-center'>
                    <h2
                      className='text-xl text-center'
                      onClick={() => navigate(`/otherprofile/${ele._id}`)}
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
                      className='border-2 p-2 rounded-lg hover:bg-gray-300 hover:text-green-800 hover:border-green-800'
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
            <p className='text-center w-full my-20 text-rose-500 text-4xl'>
              No Users Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUsers;
