import getLocalTime from "../utils/getLocalTime";
import getWeatherIcon from "../utils/getWeatherIcon";
import { Calendar, Clock } from "lucide-react";

interface WeatherIcon {
  src: string;
}
export default function CurrentWeather({ weatherData }: any) {
  const currentWeather = weatherData?.current?.current_weather;
  const weatherIcon: any = getWeatherIcon(currentWeather?.weather?.[0]?.icon);
  console.log("wether icon", weatherIcon);
  const weatherDescription = currentWeather?.weather?.[0]?.description;
  const weatherMainly = currentWeather?.weather?.[0]?.main;
  const cityName = currentWeather?.name;
  const currentCountry = currentWeather?.sys?.country;
  const { date, time } = getLocalTime({
    weatherData: {
      dt: Number(currentWeather?.dt),
      timezone: Number(currentWeather?.timezone),
    },
  });
  return (
    <div className="flex flex-col">
      <div className="mb-4 items-center flex justify-center">
        {/* Replace with actual weather icon */}
        <img
          src={weatherIcon.src as string}
          alt={weatherDescription}
          className="object-fit h-[160px] w-[160px] mt-10 "
        />
      </div>
      <h1 className="mb-2 text-4xl  font-medium mt-8 text-center">
        {currentWeather?.main?.temp}°C
      </h1>
      <div className="mb-1 mt-4 flex gap-4 items-center justify-center">
        <Calendar className="h-5 w-5 text-gray-500" />
        <div className="">
          <p className="text-gray-500">Date</p>
          <p className="font-medium ">{date}</p>
        </div>
      </div>
      <div className="mb-1 text-lg flex gap-4 mt-5 items-center md:ml-9 md:justify-normal justify-center">
        <Clock className="h-5 w-5 text-gray-500" />
        <div>
          <div className="text-sm text-gray-500">Time</div>
          <div className="font-medium">{time}</div>
        </div>
      </div>
      <div className="mb-4 flex items-center space-x-2 mt-4 md:ml-9 ml-0 justify-center md:justify-normal">
        <img src={weatherIcon.src} alt="desc" className="h-8 w-8 object-fit" />
        <p>{weatherDescription}</p>
      </div>
      <div className="flex items-center space-x-2 mt-4 md:ml-9 ml-0 justify-center md:justify-normal">
        <img src={weatherIcon?.src} alt="desc" className="h-8 w-8 object-fit" />
        <p>Mainly {weatherMainly}</p>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg">
        <div className="h-10 w-full" />
        <div className="bg-gray-800 p-2 text-white text-2xl">
          <p>
            {cityName}, {currentCountry}
          </p>
        </div>
      </div>
    </div>
  );
}
