import React, { Fragment } from "react";

export default function BackgroundBlur({
  children,
  weather,
  bgColor,
  height = "h-[22rem]",
  backgroundImg,
}) {
  return (
    <>
      {/* <div
        className={`  w-full ${height} bg-cover bg-center ${bgColor}`}
      ></div> */}
      <div
        className={` w-full  bg-cover bg-center ${bgColor} flex flex-col justify-center items-end h-full`}
        style={{ backgroundImage: `url('img/background/${backgroundImg}')` }}
      >
        {children}
      </div>
    </>
  );
}
