import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

function index() {
  return (
    <div>
      <div className=" bg-black flex flex-col ">
        <div className="flex flex-row h-screen p-5">
          <Sidebar />

          <div className="flex-1 w-full overflow-hidden overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
