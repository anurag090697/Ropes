/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clrrsp, followUnfollowUser, getSuggestedUsers } from "../../slice";
import { useNavigate } from "react-router";

function SuggestProfiles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, responseObj, suggestedUsers } = useSelector(
    (state) => state.ropes
  );
  const [msgerr, setmsgerr] = useState({ message: "", error: "" });

  useEffect(() => {
    if (responseObj.message || responseObj.error) {
      setTimeout(() => {
        dispatch(clrrsp({}));
      }, 5000);
    }
    setmsgerr(responseObj);
    setTimeout(() => {
      setmsgerr({ message: "", error: "" });
    }, 2000);
  }, [responseObj]);

  useEffect(() => {
    if (user.logged) {
      dispatch(getSuggestedUsers({ userId: user._id }));
    }
  }, [user]);

  return (
    <div className='flex flex-col gap-1 w-full px-20 py-10 items-center justify-center'>
      <div
        className={`${
          msgerr.message || msgerr.error ? "" : "hidden"
        } fixed z-50 w-full font-medium bg-white/50 top-0 h-dvh flex flex-col items-center justify-center text-2xl `}
      >
        <p className='text-lime-400'>{msgerr.message}</p>
        <p className='text-rose-700'>{msgerr.error}</p>
      </div>
      <div className='p-8 w-1/2 max-w-full rounded-lg border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <h1 className='text-2xl text-center'>Suggested Profiles</h1>
        <div className='flex flex-wrap gap-4 items-center justify-between py-6'>
          {suggestedUsers.length ? (
            suggestedUsers.map((ele, idx) => {
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
                      className='text-xl text-center cursor-pointer'
                      onClick={() =>
                        navigate(`/otherprofile/${ele.username}`, {
                          state: { data: ele },
                        })
                      }
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
            <p className='text-center w-full my-20 text-rose-500 text-4xl'>
              No Users Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuggestProfiles;
