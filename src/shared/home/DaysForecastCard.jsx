import moment from "moment";
import React from "react";
import DaysForecastMiniCard from "./DaysForecastMiniCard";

export default function DaysForecastCard({ temperature, data }) {
    const dayData = data.day;
    console.log(dayData);
  const forecastDate = moment(data.date).format("ll");
  return (
    <div className="p-2 h-full w-auto">
      <div className="flex flex-col h-full backdrop-blur-lg bg-black/10 rounded-lg p-3">
        <div className="text-xl text-white font-semibold">{forecastDate}</div>
        <div className="flex-1 flex flex-col pt-5">
          <div className="flex flex-row h-[5rem]">
            <div>
              <img alt={data.day.condition.icon} className="pl-3" src={data.day.condition.icon} />
            </div>

            <div className="flex-1 grid grid-rows-2 pl-5 text-white text-xl">
              {temperature.map((temp, index) => {
                return (
                  <div key={index}>
                    {temp}
                    <span className="text-2xl">°C</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 grid grid-rows-2 h-full text-white">
            <div className="grid grid-cols-3">
              <DaysForecastMiniCard heading={'Wind'} value={`${dayData.maxwind_kph} kph`}/>
              <DaysForecastMiniCard heading={'Rain'} value={`${dayData.daily_chance_of_rain} %`}/>
              <DaysForecastMiniCard heading={'Humidity'} value={`${dayData.avghumidity} %`}/>
            </div>
            <div className="grid grid-cols-2">
              <DaysForecastMiniCard heading={'Version'} value={`${dayData.avgvis_km} km`}/>
              <DaysForecastMiniCard heading={'UV'} value={`${dayData.uv}`}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}