import React from "react";
import { HiHome } from "react-icons/hi";
import NavLink from "../shared/NavLink";
import { BsFillCloudRainHeavyFill } from "react-icons/bs";
export default function sideBar() {
  return (
    <div className=" xl:block lg:block md:hidden sm:hidden hidden relative flex flex-col overflow-auto justify-between backdrop-blur-md bg-sky-400/30 rounded-lg mr-4">
      <div>
        <div className="p-2">
          <div className="grid place-content-center text-white">ICON</div>
        </div>
        <hr className="h-px mt-4 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />

        <NavLink to={"/"} name="Home" icon={<HiHome />} />

        <NavLink to={"/rain"} name="Rain" icon={<BsFillCloudRainHeavyFill />} />
      </div>
    </div>
  );
}
