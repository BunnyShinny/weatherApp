import React, { useContext, useEffect, useState } from "react";
import HighlightCard from "../shared/home/HighlightCard";
import BackgroundBlur from "../shared/BackgroundBlur";
import UserLocationWeatherCard from "../shared/home/UserLocationWeatherCard";
import Slider from "../shared/Slider";
import ForecastCard from "../shared/home/ForecastCard";
import DaysForecastCard from "../shared/home/DaysForecastCard";
import Loader from "../shared/Loader";
import {
  SliderCardWidthProvider,
  SliderCardWidthContext,
} from "../context/SliderCardWidth";

export default function Home() {
  const [data, setData] = useState();
  const [forecastDays, setForecastDays] = useState(7);
  const [cardWidth, setCardWidth] = useState({
    "card 1": "w-[253px]",
    "card 2": "w-[20rem]",
  });

  const forecastDateChangeHandler = (value) => {
    setForecastDays(value);
  };
  const fetchUserData = async (link, setData) => {
    const data = await (await fetch(link)).json();

    setData(data);
  };

  useEffect(() => {
    fetchUserData(
      `http://api.weatherapi.com/v1/forecast.json?key=c20ba7a4d8d04c3ca4f80417231008&q=Yangon&days=${forecastDays}&aqi=no&alerts=no`,
      setData
    );
  }, [forecastDays]);
  const weather = data?.current.condition.text;
  let CurrentWeatherCardColor = "";
  switch (weather) {
    case "Partly cloudy":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-yellow-400 to-gray-300";
      break;

    case "Overcast":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-400 to-gray-300";
      break;

    case "Light rain":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-sky-500 to-gray-400";
      break;

    case "Light drizzle":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-400 to-gray-600";
      break;

    default:
      CurrentWeatherCardColor = "bg-gradient-to-tr from-sky-400 to-gray-300";
      break;
  }
  return (
    <div className="flex flex-col">
      <div className="grid xl:grid-cols-5 lg:grid-cols-5 grid-cols-1 xl:gap-4 lg:gap-4 gap-0 text-gray-300 ">
        <div className="relative w-full h-full colspan-2 rounded-xl col-span-1 text-white overflow-hidden">
          <BackgroundBlur
            weather={data?.current.condition.text}
            bgColor={CurrentWeatherCardColor}
          >
            <UserLocationWeatherCard data={data} />
          </BackgroundBlur>
        </div>
        <div className="relative w-full h-auto rounded-lg col-span-4 overflow-hidden">
          {/* <BackgroundBlur height="h-[22rem]"> */}
          <div className="flex flex-col  h-full overflow-auto">
            <div className="">Today's Highlight</div>
            <div className="flex flex-col h-full">
              <div className="flex-none grid xl:grid-cols-6 lg:grid-cols-6 grid-cols-2  gap-3 mt-2">
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
                      cardWidthData={cardWidth}
                      setCardWidth={setCardWidth}
                    >
                      {data ? (
                        <>
                          {data?.forecast.forecastday[0].hour?.map(
                            (hourly, index) => {
                              return (
                                <div
                                  key={index}
                                  id={"card 1"}
                                  className={cardWidth['card 1']}
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
                        </>
                      ) : (
                        <Loader />
                      )}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </BackgroundBlur> */}
        </div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 grid-cols-1  gap-4 h-10 text-gray-300 mb-2 bg pt-2 h-full">
        <div className="flex justify-between">
          <div className="rounded-xl text-gray-300 px-3 my-1 ">
            {forecastDays} Days forecast
          </div>
          <select
            id="forecast date"
            value={forecastDays}
            className="rounded-xl bg-gray-400 text-white m-1 p-1"
            onChange={(e) => forecastDateChangeHandler(e.target.value)}
          >
            <option value={7}>7 Days</option>
            <option value={10}>10 Days</option>
          </select>
        </div>
        <div className="relative w-full h-full col-span-4 overflow-hidden "></div>
      </div>
      <div className="relative h-auto rounded-lg col-span-4 overflow-hidden">
        <div className="h-auto">
          <Slider
            sliderId={2}
            data={data?.forecast.forecastday}
            perslide={5}
            cardWidthData={cardWidth}
            setCardWidth={setCardWidth}
          >
            {data ? (
              <>
                {data?.forecast.forecastday?.map((hourly, index) => {
                  return (
                    <div
                      key={index}
                      id={"card 2"}
                      className={cardWidth['card 2']}
                    >
                      <DaysForecastCard
                        data={hourly}
                        temperature={[
                          hourly.day.maxtemp_c,
                          hourly.day.mintemp_c,
                        ]}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <Loader />
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}
