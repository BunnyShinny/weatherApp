import React, { Fragment } from "react";

export default function backgroundBlur({
  children,
  weather,
  bgColor ,
  height='h-[22rem]'
}) {
  
  return (
    <>
      {/* <div
        className={`  w-full ${height} bg-cover bg-center ${bgColor}`}
      ></div> */}
      {/* <div className="absolute top-0 w-full h-full p-3"> */}
        {children}
        {/* </div> */}
    </>
  );
}
