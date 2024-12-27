/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../slice";

function EditProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.ropes);
  const [userInfo, setUserInfo] = useState({});
  const [responseMsg, setRsponseMsg] = useState({ message: "", error: "" });

  useEffect(() => {
    setUserInfo(user);
  }, [user]);
  //   console.log(userInfo.displaypicture);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userInfo["name"]);
    formData.append("email", userInfo["email"]);
    formData.append("displaypicture", userInfo["displaypicture"]);
    formData.append("bio", userInfo["bio"]);
    formData.append("username", userInfo["username"]);
    dispatch(updateProfile(formData));
    // console.log(formData);
  }

  if (!user.logged) {
    return "loading";
  }

  return (
    <div className='flex flex-col gap-1 w-full p-2 md:px-20 md:py-10 items-center justify-center'>
      <div className='p-4 md:p-8 w-4/5 md:w-2/3 lg:w-1/2 rounded-lg border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
        <h1 className='text-center text-2xl'>Edit Profile</h1>

        <form
          action=''
          className='text-blue-900 text-md sm:text-lg font-medium p-1 sm:p-2'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='grid grid-cols-3 w-full my-2'>
            <label htmlFor='name' className='col-span-3 sm:col-span-1 text-white'>
              Full Name :{" "}
            </label>
            <input
              className='col-span-3 sm:col-span-2 rounded-lg p-1 sm:px-3 border border-cyan-900 outline-emerald-700'
              type='text'
              name='name'
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, ["name"]: e.currentTarget.value })
              }
            />
          </div>
          <div className='grid grid-cols-3 w-full my-2'>
            {" "}
            <label htmlFor='email' className='col-span-3 sm:col-span-1 text-white'>
              Email :{" "}
            </label>
            <input
              className='col-span-3 sm:col-span-2 rounded-lg p-1 sm:px-3 border border-cyan-900 outline-emerald-700'
              type='email'
              name='email'
              value={userInfo.email}
              disabled
              // onChange={(e) =>
              //   setUserInfo({ ...userInfo, email: e.currentTarget.value })
              // }
            />
          </div>
          <div className='grid grid-cols-3 w-full my-2'>
            {" "}
            <label htmlFor='username' className='col-span-3 sm:col-span-1 text-white'>
              UserName :{" "}
            </label>
            <input
              className='col-span-3 sm:col-span-2 rounded-lg p-1 sm:px-3 border border-cyan-900 outline-emerald-700'
              type='text'
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.currentTarget.value })
              }
            />
          </div>
          <div className='grid grid-cols-3 w-full my-2'>
            {" "}
            <label htmlFor='bio' className='col-span-3 sm:col-span-1 text-white'>
              Bio :{" "}
            </label>
            <input
              className='col-span-3 sm:col-span-2 rounded-lg p-1 sm:px-3 border border-cyan-900 outline-emerald-700'
              type='text'
              value={userInfo.bio}
              onChange={(e) =>
                setUserInfo({ ...userInfo, bio: e.currentTarget.value })
              }
            />
          </div>
          <div className='grid grid-cols-3  w-full my-2'>
            {" "}
            <label htmlFor='displaypicture' className='col-span-3 sm:col-span-1 text-white'>
              Profile Picture :{" "}
            </label>
            <input
              type='file'
              name='displaypicture'
              id=''
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  displaypicture: e.currentTarget.files[0],
                })
              }
              className='rounded-lg py-1 col-span-3 sm:col-span-2 border border-cyan-900 outline-emerald-700'
            />
          </div>
          {/* <div className='grid grid-cols-3 w-fit my-2'>
            {" "}
            <label htmlFor='bio' className='col-span-1 text-white'>
              Password :{" "}
            </label>
            <input
              className='col-span-2 rounded-lg py-1 px-3 border border-cyan-900 outline-emerald-700'
              type='text'
              value={userInfo.bio}
              onChange={(e) =>
                setUserInfo({ ...userInfo, bio: e.currentTarget.value })
              }
            />
            <input
              className='col-span-2 rounded-lg py-1 px-3 border border-cyan-900 outline-emerald-700'
              type='text'
              value={userInfo.bio}
              onChange={(e) =>
                setUserInfo({ ...userInfo, bio: e.currentTarget.value })
              }
            />
          </div> */}

          <div className='w-full flex items-center justify-center py-10'>
            <button className=' bg-orange-400 font-medium border text-xl py-2 px-4 rounded-xl text-white shadow-md shadow-orange-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all'>
              Save
            </button>
          </div>
        </form>
        <div className='font-medium min-h-10 text-center'>
          <p className='text-emerald-500'>{responseMsg.message}</p>
          <p className='text-rose-500'>{responseMsg.error}</p>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
