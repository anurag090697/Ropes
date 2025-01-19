/** @format */

import React, { useEffect, useState } from "react";
import rlogo from "../../assets/threadsl.png";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import Cookies from 'js-cookie'; 
import { PiHeartBold } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { alreadyLogged, userLogout } from "../../slice";
import { BsChatRightTextFill } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
// import { FaConnectdevelop } from "react-icons/fa";
// import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import { FaPlus } from "react-icons/fa";
// import { SlOptionsVertical } from "react-icons/sl";

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
  // console.log(Cookies.get('ropes_token'));
  const logControlls = (
    <ul
      className={`text-lg absolute flex flex-col items-start justify-center w-44 gap-1 ${
        optbottom ? "" : "hidden"
      } bg-white text-slate-800 font-medium px-3 py-4 rounded-lg border-2 border-gray-500 right-0 bottom-12 md:left-10 md:bottom-0`}
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
            <NavLink className='text-blue-500 hover:text-blue-700' to='/signup'>
              Signup
            </NavLink>
          </span>
        </>
      )}
    </ul>
  );

  useEffect(() => {
    dispatch(alreadyLogged({}));
  }, []);

  return (
    <div className='absolute top-0 z-50'>
      <header className='md:p-2 text-white flex items-center justify-between w-full fixed text-4xl px-4 py-1 bg-slate-700 md:bg-transparent'>
        <NavLink to={user.logged ? "/" : "/login"} className='place-self-start'>
          <img className='w-12 md:w-14 ' src={rlogo} alt='Ropes-logo' />
        </NavLink>
        <h3 className='text-3xl md:hidden'>Ropes</h3>
        <NavLink
          to='/messages'
          className={({ isActive }) =>
            isActive
              ? "text-lime-200 block md:hidden"
              : "hover:text-white  block md:hidden"
          }
        >
          <BsChatRightTextFill />
        </NavLink>
      </header>
      <div className='text-gray-400 w-full md:w-fit md:mt-20 z-50 text-4xl fixed left-0 md:p-4 flex items-center justify-around gap-20 bottom-0 md:top-0 md:flex-col'>
        <div className='flex bg-slate-800 w-full md:bg-transparent md:flex-col items-center justify-around py-2 gap-8 '>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-lime-200" : "hover:text-white"
            }
            to='/'
          >
            <GoHome />
          </NavLink>
          <NavLink
            to='/searchUser'
            className={({ isActive }) =>
              isActive ? "text-lime-200" : "hover:text-white"
            }
          >
            <IoSearch />
          </NavLink>
          <NavLink
            to='/messages'
            className={({ isActive }) =>
              isActive
                ? "text-lime-200 md:block hidden"
                : "hover:text-white md:block hidden"
            }
          >
            <BsChatRightTextFill />
          </NavLink>
          <NavLink
            to='/notification'
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
          <div className='relative md:block '>
            <button
              className=''
              // onBlur={() => setoptbottom(false)}
              onClick={() => setoptbottom(!optbottom)}
            >
              <HiOutlineMenuAlt2 />
            </button>
            {logControlls}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
