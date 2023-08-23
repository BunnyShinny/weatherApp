import moment from "moment";
import React from "react";
import { WiRaindrops } from "react-icons/wi";

export default function ForecastCard({ data,time, icon, temp, rain_chance }) {
  const ForecastTime = moment(time).format("LT");
  return (
    <div className="p-4 h-full w-auto  ">
      <div className="flex flex-col h-full backdrop-blur-lg bg-white/10 hover:bg-white/30 rounded-lg p-3">
        <div>{ForecastTime}</div>
        <div className="flex-1 grid grid-cols-2 content-center">
          <img alt={icon} src={icon} />
          <div className="flex flex-col justify-center">
            <div className="flex justify-center text-xl font-semibold">{`${temp} °C`}</div>
            <div className="flex flex-row justify-center items-center text-gray-300 text-sm">
              <div className="text-3xl">
                <WiRaindrops />
              </div>
              {`${rain_chance}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
