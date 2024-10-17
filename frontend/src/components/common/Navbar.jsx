/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { PiHeartBold } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { alreadyLogged, userLogout } from "../../slice";
import { FaConnectdevelop } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

function Navbar() {
  const dispatch = useDispatch();
  const [optbottom, setoptbottom] = useState(false);
  const { user, registerUser } = useSelector((state) => state.ropes);
  const [dark, setDark] = useState(false);

  function setMode() {
    setDark((prevDark) => {
      const newDark = !prevDark;
      if (newDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newDark;
    });
    // console.log(dark);
  }

  const logio = user.logged ? (
    <>
      <li
        onClick={setMode}
        className={`flex gap-4 text-xl py-2 px-3 rounded-3xl border select-none relative dark  dark:bg-sky-900  bg-amber-200`}
      >
        <span
          className={`rounded-full border w-8 h-8 absolute top-0.5 left-2 ${
            dark ? "translate-x-8 bg-rose-800" : "bg-sky-400"
          } ease-out duration-500 transition-all`}
        ></span>
        <MdLightMode />
        <MdDarkMode />
      </li>
      {/* <hr className='border-b-0 w-full border-slate-600' /> */}
      <li className='text-emerald-600'>{user.name}</li>
      <hr className='border-b-0 w-full border-slate-600' />
      <li>
        {" "}
        <NavLink className='text-rose-400 hover:text-rose-600'>
          Report A Problem
        </NavLink>
      </li>
      <hr className='border-b-0 w-full border-slate-600' />
      <li>
        {" "}
        <NavLink className='text-cyan-500 hover:text-blue-600'>Help</NavLink>
      </li>
      <hr className='border-b-0 w-full border-slate-600' />
      <li className='text-rose-800 hover:text-rose-400 cursor-pointer'>
        Logout
      </li>
    </>
  ) : (
    <>
      <button
        onClick={setMode}
        className={`flex gap-4 text-xl py-2 px-3 rounded-3xl border select-none relative dark  dark:bg-sky-900  bg-amber-200`}
      >
        <span
          className={`rounded-full border w-8 h-8 absolute top-0.5 left-2 ${
            dark ? "translate-x-8 bg-rose-800" : "bg-sky-400"
          } ease-out duration-500 transition-all`}
        ></span>
        <MdLightMode />
        <MdDarkMode />
      </button>
      <NavLink className='text-rose-400 hover:text-rose-600'>
        Report A Problem
      </NavLink>
    </>
  );
  // console.log(user);
  useEffect(() => {
    dispatch(alreadyLogged({}));
  }, []);

  return (
    <div className='relative'>
      <header className='p-2 text-white grid grid-cols-3 md:grid-cols-2 w-full items-center'>
        <NavLink className='place-self-start'>
          <img
            className='w-14 '
            src='https://pngbuy.com/wp-content/uploads/2023/07/threads-instagram-logo-vector-png.png-2.png'
            alt=''
          />
        </NavLink>

        <select
          name=''
          className='w-fit bg-transparent border-none outline-none select-none rounded-full text-white font-medium p-1'
          id=''
        >
          {" "}
          <option value='' className='bg-gray-600'>
            For You
          </option>
          <option value='' className='bg-gray-600'>
            Following
          </option>
          <option value='' className='bg-gray-600'>
            Liked
          </option>
          <option value='' className='bg-gray-600'>
            Saved
          </option>
        </select>
        <div className='relative block md:hidden text-2xl place-self-end pr-5'>
          <button
            className=''
            onClick={() => setoptbottom(true)}
            onBlur={() => setoptbottom(false)}
          >
            <HiOutlineMenuAlt2 />
          </button>
          <div
            className={`text-lg absolute ${
              optbottom ? "" : "hidden"
            } bg-white text-slate-800 font-medium px-3 py-4 rounded-lg border-2 border-gray-500 right-1 top-0`}
          >
            {logio}
          </div>
        </div>
      </header>
      <div className='text-gray-400 mt-20 text-4xl fixed md:absolute left-0 p-4 flex items-center justify-around gap-20 bottom-0 md:top-0 md:flex-col'>
        <div className='flex md:flex-col items-center justify-center gap-8 '>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-lime-200" : "hover:text-white"
            }
            to='/'
          >
            <GoHome />
          </NavLink>
          <NavLink
            to='/search'
            className={({ isActive }) =>
              isActive ? "text-lime-200" : "hover:text-white"
            }
          >
            <IoSearch />
          </NavLink>
          <NavLink
            to='/addd'
            className={({ isActive }) =>
              isActive ? "text-lime-200" : "hover:text-white"
            }
          >
            <FaPlus />
          </NavLink>
          <NavLink
            to='/notifications'
            className={({ isActive }) =>
              isActive ? "text-lime-200" : "hover:text-white"
            }
          >
            <PiHeartBold />
          </NavLink>
          <NavLink
            to={`/viewprofile/${user.username}`}
            className={({ isActive }) =>
              isActive ? "text-lime-200" : "hover:text-white"
            }
          >
            <HiOutlineUser />
          </NavLink>
        </div>
        <div className='relative md:block hidden'>
          <button
            className=''
            // onBlur={() => setoptbottom(false)}
            onClick={() => setoptbottom(!optbottom)}
          >
            <HiOutlineMenuAlt2 />
          </button>
          <ul
            className={`text-lg absolute flex flex-col items-start justify-center w-44 gap-1 ${
              optbottom ? "" : "hidden"
            } bg-white text-slate-800 font-medium px-3 py-4 rounded-lg border-2 border-gray-500 left-10 bottom-0`}
          >
            {user.logged ? (
              <>
                <li
                  onClick={setMode}
                  className={`flex gap-4 text-xl py-2 px-3 rounded-3xl border select-none relative dark  dark:bg-sky-900  bg-amber-200`}
                >
                  <span
                    className={`rounded-full border w-8 h-8 absolute top-0.5 left-2 ${
                      dark ? "translate-x-8 bg-rose-800" : "bg-sky-400"
                    } ease-out duration-500 transition-all`}
                  ></span>
                  <MdLightMode />
                  <MdDarkMode />
                </li>
                {/* <hr className='border-b-0 w-full border-slate-600' /> */}
                <li className='text-emerald-600'>{user.name}</li>
                <hr className='border-b-0 w-full border-slate-600' />
                <li>
                  {" "}
                  <NavLink className='text-rose-400 hover:text-rose-600'>
                    Report A Problem
                  </NavLink>
                </li>
                <hr className='border-b-0 w-full border-slate-600' />
                <li>
                  {" "}
                  <NavLink className='text-cyan-500 hover:text-blue-600'>
                    Help
                  </NavLink>
                </li>
                <hr className='border-b-0 w-full border-slate-600' />
                <li
                  className='text-rose-800 hover:text-rose-400 cursor-pointer'
                  onClick={() => dispatch(userLogout({}))}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <button
                  onClick={setMode}
                  className={`flex gap-4 text-xl py-2 px-3 rounded-3xl border select-none relative dark  dark:bg-sky-900  bg-amber-200`}
                >
                  <span
                    className={`rounded-full border w-8 h-8 absolute top-0.5 left-2 ${
                      dark ? "translate-x-8 bg-rose-800" : "bg-sky-400"
                    } ease-out duration-500 transition-all`}
                  ></span>
                  <MdLightMode />
                  <MdDarkMode />
                </button>
                <NavLink className='text-rose-400 hover:text-rose-600'>
                  Report A Problem
                </NavLink>{" "}
                <span className=''>
                  <NavLink
                    className={`text-lime-700 hover:text-lime-400`}
                    to='/login'
                  >
                    Login
                  </NavLink>
                  /
                  <NavLink
                    className='text-blue-500 hover:text-blue-700'
                    to='/signup'
                  >
                    Signup
                  </NavLink>
                </span>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
