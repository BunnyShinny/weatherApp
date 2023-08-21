import React, { useEffect, useState } from "react";
import HighlightCard from "../shared/home/HighlightCard";
import BackgroundBlur from "../shared/BackgroundBlur";
import UserLocationWeatherCard from "../shared/home/UserLocationWeatherCard";
import Slider from "../shared/Slider";
import ForecastCard from "../shared/home/ForecastCard";
import DaysForecastCard from "../shared/home/DaysForecastCard";

export default function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [forecastDays, setForecastDays] = useState(7);

  const forecastDateChangeHandler = (value) => {
    setForecastDays(value);
  };
  const fetchUserData = async (link, setData) => {
    const data = await (await fetch(link)).json();

    setData(data);
    // fetch(link)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {

    //     setData(data);
    //   });
  };

  useEffect(() => {
    fetchUserData(
      `http://api.weatherapi.com/v1/forecast.json?key=c20ba7a4d8d04c3ca4f80417231008&q=Yangon&days=${forecastDays}&aqi=no&alerts=no`,
      setData
    );
  }, [forecastDays]);
  return  (
    <div className="flex flex-col">
      <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-5 grid-cols-5 gap-4 h-[22rem] text-white mb-1">
        <div className="relative w-full h-full colspan-2 rounded-xl col-span-1 overflow-hidden">
          <BackgroundBlur weather={data?.current.condition.text} bgColor={'bg-gradient-to-br from-gray-300 to-sky-800'}>
            <UserLocationWeatherCard data={data} />
          </BackgroundBlur>
        </div>
        <div className="relative w-full h-auto rounded-lg col-span-4 overflow-hidden">
          <BackgroundBlur>
            <div className="flex flex-col  h-full overflow-auto">
              <div className="">Today's Highlight</div>
              <div className="flex flex-col h-full">
                <div className="flex-none grid grid-cols-6 gap-3 mt-2">
                  <HighlightCard
                    heading="Humidity"
                    measurement={{
                      value: data?.current.humidity,
                      type: "%",
                    }}
                  />
                  <HighlightCard
                    heading="Visability"
                    measurement={{
                      value: data?.current.vis_km,
                      type: "km",
                    }}
                  />
                  <HighlightCard
                    heading="Pressure"
                    measurement={{
                      value: data?.current.pressure_mb,
                      type: "mb",
                    }}
                  />
                  <HighlightCard
                    heading={`Wind`}
                    measurement={{
                      value: data?.current.wind_kph,
                      type: "kph",
                    }}
                  />
                  <HighlightCard
                    heading="Wind Direction"
                    measurement={{
                      value: data?.current.wind_dir,
                      type: "",
                    }}
                  />
                  <HighlightCard
                    heading="UV"
                    measurement={{
                      value: data?.current.uv,
                      type: "",
                    }}
                  />
                </div>
                <div className=" flex-1 rounded-lg  pt-3 px-3">
                  <div className="flex flex-col h-full">
                    <div className="mb-0">Today's Weather Forecast</div>
                    <div className="flex-1 ">
                      <Slider
                        sliderId={1}
                        data={data?.forecast.forecastday[0].hour}
                        perslide={5}
                      >
                        {data?.forecast.forecastday[0].hour?.map(
                          (hourly, index) => {
                            return (
                              <div
                                key={index}
                                id={"card 1"}
                                className={`w-[212px]`}
                              >
                                <ForecastCard
                                  data={hourly}
                                  time={hourly.time}
                                  icon={hourly.condition.icon}
                                  temp={hourly.temp_c}
                                  rain_chance={hourly.chance_of_rain}
                                />
                              </div>
                            );
                          }
                        )}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundBlur>
        </div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1  gap-4 h-10 text-white mb-2 bg pt-2 h-full">
        <div className="flex justify-between">
          <div className="rounded-xl text-white px-3 my-1 ">
            {forecastDays} Days forecast
          </div>
          <select
            id="forecast date"
            value={forecastDays}
            className="rounded-xl bg-gradient-to-tr from-sky-800 text-black m-1 px-1"
            onChange={(e) => forecastDateChangeHandler(e.target.value)}
          >
            <option value={7}>7 Days</option>
            <option value={10}>10 Days</option>
          </select>
        </div>
        <div className="relative w-full h-full col-span-4 overflow-hidden "></div>
      </div>
      <div className="relative h-[21rem] rounded-lg col-span-4 overflow-hidden">
        {/* <BackgroundBlur bgColor={'bg-gradient-to-tl from-white to-sky-800'}> */}
          <Slider sliderId={2} data={data?.forecast.forecastday} perslide={5}>
            {data?.forecast.forecastday?.map((hourly, index) => {
              return (
                <div key={index} id={"card 2"} className={`w-[20rem]`}>
                  <DaysForecastCard
                    data={hourly}
                    temperature={[hourly.day.maxtemp_c, hourly.day.mintemp_c]}
                  />
                </div>
              );
            })}
          </Slider>
        {/* </BackgroundBlur> */}
      </div>
    </div>
  );
}
