import React, { Fragment } from "react";

export default function backgroundBlur({ children, weather, bgColor="bg-gradient-to-tr from-sky-800 to-gray-300" }) {
  let bgImg = "";

  if (weather?.includes("drizzle") || weather?.includes("rain")) {
    bgImg = "rain.jpg";
  }
  const backgroundImageUrl = `url('../public/img/background/${bgImg}')`;
  return (
    <>
      <div
        id={"bgImg"}
        className={`  w-full h-full bg-cover bg-center ${bgColor}`}
      ></div>
      <div className="absolute top-0 w-full h-full p-3">{children}</div>
    </>
  );
}
