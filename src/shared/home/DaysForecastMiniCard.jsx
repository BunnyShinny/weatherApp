import React from "react";

export default function DaysForecastMiniCard({heading,value}) {
  return (
    <div className="flex flex-col text-center">
      <div className="font-semibold">{heading}</div>
      <div className="flex-1 text-sm">{value}</div>
    </div>
  );
}
