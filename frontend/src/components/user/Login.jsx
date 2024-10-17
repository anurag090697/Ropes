/** @format */

import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogin } from "../../slice";

function Login() {
  const dispatch = useDispatch();
  const [showP, setshowP] = useState(false);
  const [responseMsg, setRsponseMsg] = useState({ message: "", error: "" });

  const { user, registerUser } = useSelector((state) => state.ropes);
  // console.log(user);
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });



  function handleSubmit(e) {
    e.preventDefault();
    // console.log(userData);
    dispatch(userLogin({ email: userData.email, password: userData.password }));
  }

  useEffect(() => {
    setRsponseMsg(registerUser);
    setTimeout(() => {
      setRsponseMsg({ message: "", error: "" });
    }, 6000);
  }, [user]);

  return (
    <div className='md:pl-20 pt-8 flex items-center justify-center w-full'>
      <div className='py-6 px-4 rounded-lg border-2 border-sky-800 bg-slate-600 text-white'>
        <h1 className='text-center text-2xl'>Signup</h1>
        <form
          action=''
          className='flex flex-col gap-4 py-4 px-2 items-center justify-center text-blue-700'
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type='email'
            name='email'
            id=''
            required
            placeholder='Enter Email'
            className='rounded-lg outline-fuchsia-900 text-center p-1 font-medium'
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.currentTarget.value })
            }
          />
          <div className='relative'>
            <input
              type={showP ? "text" : "password"}
              name='password'
              placeholder='Enter Password'
              className='rounded-lg outline-fuchsia-900 text-center p-1 font-medium'
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <span
              className={`${
                userData.password ? "" : "hidden"
              } absolute right-2 top-2 ${
                showP ? "text-rose-600" : "text-lime-900"
              }`}
              onClick={() => setshowP(!showP)}
            >
              <FaEye />
            </span>
          </div>
          <button className='bg-orange-400 font-medium border text-xl py-2 px-4 rounded-xl text-white shadow-md shadow-orange-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all'>
            Submit
          </button>
        </form>
        <div className='font-medium min-h-10 text-center'>
          <p className='text-emerald-500'>{responseMsg.message}</p>
          <p className='text-rose-500'>{responseMsg.error}</p>
        </div>
        <p>
          Don't have an account{" "}
          <NavLink className='text-violet-300' to='/signup'>
            Signup{" "}
          </NavLink>
          here
        </p>
      </div>
    </div>
  );
}

export default Login;
