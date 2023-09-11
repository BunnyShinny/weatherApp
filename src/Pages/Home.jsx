import React, { useEffect, useState } from "react";
import HighlightCard from "../shared/home/HighlightCard";
import UserLocationWeatherCard from "../shared/home/UserLocationWeatherCard";
import DaysForecastCard from "../shared/home/DaysForecastCard";
import Loader from "../shared/Loader";
import AreaChart from "../shared/AreaChart";
import axios from "axios";
import Location from "../shared/home/Location";
import Carousal from "../shared/Carousal";

export default function Home() {
  const [data, setData] = useState();
  const [forecastDays, setForecastDays] = useState(3);

  const [cardWidth, setCardWidth] = useState({
    "card 1": "w-[253px]",
    "card 2": "w-[297px]",
  });
  let latlong = Location();
  
  const fetchUserData = async (link, setData) => {
    // const data = await (await fetch(link));
    axios
      .get(link)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(latlong);
  useEffect(() => {
    if (latlong) {
      fetchUserData(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latlong}&days=${forecastDays}`,
        setData
      );
    // } else {
    //   console.log("Geolocation is not supported by your browser.");
    }
  }, [forecastDays, latlong]);
  const weather = data?.current.condition.text;
  let CurrentWeatherCardColor = "";
  let backgroundImg = "";

  switch (weather) {
    case "Partly cloudy":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-yellow-400 to-gray-300";
      backgroundImg = "cloudy.jpg";
      break;

    case "Overcast":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-300 to-gray-700";
      backgroundImg = "cloudy.jpg";

      break;

    case "Light drizzle":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-400 to-gray-600";
      backgroundImg = "light rain.jpg";

      break;

    case "Light rain":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-sky-500 to-gray-400";
      backgroundImg = "light rain.jpg";

      break;

    case "Moderate rain":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-500 to-gray-600";
      backgroundImg = "light rain.jpg";

      break;

    case "Heavy rain":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-500 to-gray-600";
      backgroundImg = "heavy rain.jpg";

      break;

    case "Moderate or heavy rain with thunder":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-600 to-gray-700";
      backgroundImg = "storm.jpg";

      break;

    default:
      CurrentWeatherCardColor = "bg-gradient-to-tr from-sky-400 to-gray-300";
      backgroundImg = "weather.jpg";

      break;
  }
  
  return data ? (
    <div className="flex flex-col">
      <div className="grid xl:grid-cols-5 lg:grid-cols-5 grid-cols-1 xl:gap-4 lg:gap-4 gap-0 text-gray-300 ">
        <div className="relative w-full h-auto colspan-2 rounded-xl col-span-1 text-white  xl:mb-0 lg:mb-0 mb-3">
          <div
            className={` w-full  bg-cover bg-center ${CurrentWeatherCardColor} flex flex-col justify-center items-end h-auto`}
            style={{
              backgroundImage: `url('img/background/${backgroundImg}')`,
            }}
          >
            <UserLocationWeatherCard
              data={data}
              bgColor={CurrentWeatherCardColor}
              location={latlong}
            />
          </div>
        </div>
        <div className="relative w-full h-auto rounded-lg col-span-4 ">
          {/* <BackgroundBlur height="h-[22rem]"> */}
          <div className="flex flex-col  h-full">
            <div className="xl:mt:0 lg:mt-0 mt-3">Today's Highlight</div>
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
              <div className=" flex-1 rounded-lg  pt-1 px-0">
                <div className="relative flex h-full w-full ">
                  {/* <div className="mb-0">Today's Weather Forecast</div> */}
                  {data ? (
                    <div className="h-auto w-full shadow-lg rounded-lg grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3">
                      <>
                        <AreaChart
                          data={data?.forecast.forecastday[0].hour}
                          label={"Temperature"}
                          colorCode={"255,132,0"}
                        />
                        <AreaChart
                          data={data?.forecast.forecastday[0].hour}
                          label={"Rain Chance"}
                          colorCode={"75, 192, 192"}
                        />
                      </>
                    </div>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* </BackgroundBlur> */}
        </div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 xl:gap-4 gap-0 h-10 text-gray-300 mt-2 bg pt-0 h-full xl:grid lg:grid md:grid sm:hidden hidden">
        <div className="flex justify-between">
          <div className="rounded-xl text-gray-300 px-3 mb-1 self-center">
            {forecastDays} Days forecast
          </div>
          <select
            id="forecast date"
            value={forecastDays}
            className="rounded-xl bg-gray-400 text-white m-1 p-1"
            onChange={(e) => setForecastDays(e.target.value)}
          >
            <option value={3}>3 Days</option>
            {/* <option value={10}>10 Days</option> */}
          </select>
        </div>
      </div>
      <div className="relative h-auto rounded-lg col-span-4 ">
        <div className="h-auto">
          {data ? (
            <Carousal
              sliderId={2}
              data={data?.forecast.forecastday}
              cardWidth={cardWidth}
              setCardWidth={setCardWidth}
            >
              
                {data?.forecast.forecastday?.map((hourly, index) => {
                  return (
                    <div
                      key={index}
                      id={"card 2"}
                      className={"w-auto"}
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
                
              
            </Carousal>
          ) : (
            <div className={"h-auto"}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
