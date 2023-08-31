import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

function index() {
  return (
    <div>
      <div className=" bg-a flex flex-col ">
        <div className="flex flex-row h-screen  ">
          <div className="hidden">
            <Sidebar />
          </div>
          <div className="flex-1 w-full overflow-hidden overflow-y-auto p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
