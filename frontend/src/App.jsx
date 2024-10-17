/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import Home from "./components/Home";
// import { alreadyLogged } from "./slice";
function App() {
  const { user } = useSelector((state) => state.ropes);
  const dispatch = useDispatch();

  return (
    <div className='container min-w-full min-h-dvh bg-gradient-to-br from-gray-700 to-slate-800 select-none pb-20 dark:from-white dark:to-white'>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route
            path='/viewprofile/:username'
            element={<Profile></Profile>}
          ></Route>
          <Route
            path='/editprofile/:username'
            element={<EditProfile></EditProfile>}
          ></Route>
          <Route path='/' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
