import React from "react";

export default function DaysForecastMiniCard({heading,value}) {
  return (
    <div className="flex flex-col items-center  rounded-lg border border-gray-200 h-auto p-3">
      <div className="font-semibold">{heading}</div>
      <div className=" text-sm">{value}</div>
    </div>
  );
}
