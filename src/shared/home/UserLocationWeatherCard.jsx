import React from "react";
import { HiSearch } from "react-icons/hi";
import { WiDayRain, WiCloud } from "react-icons/wi";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import moment from "moment/moment";

export default function UserLocationWeatherCard({ data, location }) {
  let currentTime = "";
  const wealtherIcon = () => {
    if (data) {
      switch (data.current.condition.text) {
        case "Moderate rain":
          return <WiDayRain />;
        case "Light rain":
          return <WiDayRain />;
        case "Heavy rain":
          return <WiDayRain />;
        case "Overcast":
          return <WiCloud />;
        default:
          return <WiCloud />;

      }
    }
  };
  if (data) {
    currentTime = moment(data.current.last_updated)
      .format("MMMM Do YYYY, h:mm:ss a")
      .split(",");
  }
  return (
    <>
      {/* <h1
        className={`flex mt-3 mr-3 text-end text-white font-semibold drop-shadow-lg `}
      >
        <HiSearch />
      </h1> */}

      <div className=" w-full h-full p-3 pb-3 pt-2 mt-10">
        {data ? (
          <div className="backdrop-blur-lg bg-white/10 rounded-lg p-2">
            <div className="mb-1 flex flex-col">
              <div className="w-24 h-15 rounded-lg ">
                <img
                  alt={data.current.condition.icon}
                  className="w-25 h-20"
                  src={data.current.condition.icon}
                />
              </div>
              <div className="flex w-24">
                <div className="text-5xl">{data.current.temp_c}</div>
                <div className="text-xl">°C</div>
              </div>
            </div>
            <div className="my-2 flex">
              <div className="text-3xl mr-2">{wealtherIcon()}</div>
              <p className="flex items-center">{data.current.condition.text}</p>
            </div>
            <hr className="divide-y divide-blue-200 my-4" />

            <div className="my-3 flex-row">
              <div className="flex my-3">
                <div className="text-2xl mr-2">
                  <CiLocationOn />
                </div>
                <div className="text-sm">{`${data.location.name}, ${data.location.country}`}</div>
              </div>
              <div className="flex my-3">
                <div className="text-2xl mr-2">
                  <CiCalendar />
                </div>
                <div className="text-sm flex">
                  <div>{currentTime[0]}</div>
                  <span className="ml-2 font-semibold">{currentTime[1]}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-50">
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
}
