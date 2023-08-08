import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar"
function index() {
  return (
    <div className=" bg-black h-screen w-screen p-5">
      <div className="flex h-full ">
        <Sidebar />

        <div className="flex-1 h-full w-auto backdrop-blur-md bg-white/30 p-3 rounded-lg">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default index;
