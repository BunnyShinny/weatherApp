import React from "react";
import HighlightCard from "../shared/HighlightCard";
import { HiSearch } from "react-icons/hi";
import { WiDayCloudy } from "react-icons/wi";
import { CiLocationOn, CiCalendar } from "react-icons/ci";

import BackgroundBlur from "../shared/backgroundBlur";
export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-5 gap-4 h-96 text-white">
        <div className="relative w-full h-full colspan-2 rounded-xl col-span-1 overflow-hidden">
          <BackgroundBlur>
            <div className="flex flex-col justify-center items-end h-full">
              <h1 className="right-0 text-end text-white font-semibold drop-shadow-lg bg-black rounded-full p-3 hover:bg-gray-700 hover:cursor-pointer">
                <HiSearch />
              </h1>
              <div className=" w-full h-full p-3">
                <div className="my-3 flex flex-col">
                  <div className="w-12 h-12">
                    <img className="" src="./img/cloudy.png" />
                  </div>
                  <div className="text-3xl">34°C</div>
                </div>
                <div className="my-3 flex">
                  <div className="text-2xl mr-2">
                    <WiDayCloudy />
                  </div>
                  <p>Cloudy</p>
                </div>
                <hr className="divide-y divide-blue-200 my-3" />

                <div className="my-3 flex-row">
                  <div className="flex my-3">
                    <div className="text-2xl mr-2">
                      <CiLocationOn />
                    </div>
                    <div className="text-sm">Yangon, Myanmar</div>
                  </div>
                  <div className="flex my-3">
                    <div className="text-2xl mr-2">
                      <CiCalendar />
                    </div>
                    <div className="text-sm">
                      9 August, 2023{" "}
                      <span className="mr-2 font-semibold">3:01 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundBlur>
        </div>
        <div className="relative w-full h-auto rounded-xl col-span-4 overflow-hidden">
          <BackgroundBlur>
            <div className="flex flex-col  h-full overflow-auto">
              <div className="">Today's Highlight</div>
              <div className="grid grid-cols-3 gap-3 h-full">
                <HighlightCard
                  heading="Humidity"
                  measurement={{ value: "36", type: "%", description: "" }}
                />
                <HighlightCard
                  heading="Visability"
                  measurement={{ value: "6", type: "km", description: "Good Visbility (5 - 10 km)" }}
                />
                <HighlightCard
                  heading="Pressure"
                  measurement={{ value: "1007", type: "mb", description: "" }}
                />
              </div>
            </div>
          </BackgroundBlur>
        </div>
      </div>
      {/* <div className="grid grid-cols-5 gap-4 h-20 text-white">2</div>
      <div className="grid grid-cols-5 gap-4 h-80 text-white">3</div> */}
    </div>
  );
}
