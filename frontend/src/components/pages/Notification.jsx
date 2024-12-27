/** @format */

import React from "react";

function Notification() {
  return (
    <div className='flex flex-col gap-1 w-full px-4 md:px-20 md:py-10 items-center justify-center'>
      {" "}
      <div className='p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full rounded-lg border-2 text-white bg-gradient-to-r from-slate-500 to-gray-500'>
      <img src="https://cdn.pixabay.com/animation/2023/05/28/16/56/16-56-27-962_512.gif" className="mx-auto rounded-full w-56 sm:w-96" alt="" />
      </div>
    </div>
  );
}

export default Notification;
