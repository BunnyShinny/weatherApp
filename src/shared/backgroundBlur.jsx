import React, { Fragment } from "react";

export default function backgroundBlur({ children }) {
  return (
    <>
      <div className="w-full h-full bg-[url('../public/img/weather.jpg')] bg-cover bg-center blur-lg"></div>
      <div className="absolute top-0 w-full h-full p-3">{children}</div>
    </>
  );
}
