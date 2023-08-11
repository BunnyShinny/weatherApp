import React, { useEffect, useState } from "react";
import HighlightCard from "../shared/home/HighlightCard";
import BackgroundBlur from "../shared/BackgroundBlur";
import UserLocationWeatherCard from "../shared/home/UserLocationWeatherCard";
export default function Home() {
  const [storageData, setStorageData] = useState();

  const fetchUserData = async () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=c20ba7a4d8d04c3ca4f80417231008&q=Yangon&aqi=yes`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStorageData(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(storageData);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-5 gap-4 h-96 text-white mb-1">
        <div className="relative w-full h-full colspan-2 rounded-xl col-span-1 overflow-hidden">
          <BackgroundBlur>
            <UserLocationWeatherCard data={storageData} />
          </BackgroundBlur>
        </div>
        <div className="relative w-full h-auto rounded-xl col-span-4 overflow-hidden">
          <BackgroundBlur>
            <div className="flex flex-col  h-full overflow-auto">
              <div className="">Today's Highlight</div>
              <div className="grid grid-cols-3 gap-3 h-full">
                <HighlightCard
                  heading="Humidity"
                  measurement={{
                    value: storageData?.current.humidity,
                    type: "%",
                    description: "The dew point is 27°C right now.",
                  }}
                />
                <HighlightCard
                  heading="Visability"
                  measurement={{
                    value: storageData?.current.vis_km,
                    type: "km",
                    description: "Good Visbility (5 - 10 km).",
                  }}
                />
                <HighlightCard
                  heading="Pressure"
                  measurement={{
                    value: storageData?.current.pressure_mb,
                    type: "mb",
                    description: "It is normalized to standard pressure.",
                  }}
                />
              </div>
            </div>
          </BackgroundBlur>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 h-10 text-white mb-2 bg pt-2">
        <div className="relative w-full h-full col-span-1 overflow-hidden">
          <div className="flex justify-between">
            <div className="rounded-xl text-white px-3 my-1 ">
              7 Day forecast
            </div>
              <select id="countries" className="rounded-xl bg-gray-700 m-1 px-1">
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
              </select>
            </div>
          </div>
        <div className="relative w-full h-full col-span-4 overflow-hidden "></div>
      </div>
    </div>
  );
}
