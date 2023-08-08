import React from "react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function NavLink({ to, name, icon }) {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  let activeLink = pathname;
  if (splitLocation.length > 2) {
    activeLink = "/" + splitLocation[1];
  }
  console.log(activeLink);
  return (
    <Link className="pr-2 my-2 flex" to={to}>
      <div
        className={`flex ${
          activeLink === to
            ? "bg-gradient-to-r from-gray-400 text-xl"
            : "hover:bg-gradient-to-r hover:from-gray-400 text-xl"
        }`}
      >
        <span
          className={`w-1  rounded-r-lg ${
            activeLink === to ? "bg-white" : "hover:bg-white"
          }`}
        />
        <div className="py-2 px-3 text-white ">{icon}</div>
      </div>
    </Link>
  );
}
