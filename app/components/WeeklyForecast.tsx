import { useState } from "react";
import extractUniqueDates from "../utils/extractUniqueDates";
import getWeatherIcon from "../utils/getWeatherIcon";

interface WeatherIcon {
  src: string;
}

interface Weather {
  icon: string;
  main: string;
  description: string;
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherItem {
  dt_txt: string;
  weather: Weather[];
  main: MainWeatherData;
  day?: string;
}

interface ForecastData {
  list: WeatherItem[];
}

interface WeatherData {
  forecast: ForecastData;
}

interface WeeklyForecastProps {
  weatherData: WeatherData;
}

export default function WeeklyForecast({ weatherData }: WeeklyForecastProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [active, setActive] = useState<string>("Weekly");

  const weeklyData = extractUniqueDates(weatherData?.forecast?.list);
  const todayWeather: any = weeklyData[0];

  const getDay = (date: string) => {
    const day = new Date(date).getDay();
    return daysOfWeek[day];
  };

  return (
    <div className="mb-6">
      <div className="mb-4 flex space-x-4">
        <button
          className={`${active === "Today" ? "border-b-2 border-black" : ""} font-medium ${active === "Today" ? "text-black" : "text-gray-400"}`}
          onClick={() => setActive("Today")}
        >
          Today
        </button>
        <button
          className={`${active === "Weekly" ? "border-b-2 border-black" : ""} font-medium  ${active === "Weekly" ? "text-black" : "text-gray-400"}`}
          onClick={() => setActive("Weekly")}
        >
          Week
        </button>
      </div>
      <div className="grid md:grid-cols-7 gap-4 sm:grid-cols-3">
        {active === "Today" && (
          <div
            key={todayWeather?.day}
            className="text-center bg-white rounded-xl p-6"
          >
            <p className="mb-2">
              {getDay(todayWeather?.dt_txt?.split(" ")[0])}
            </p>
            <img src={getWeatherIcon(todayWeather?.weather?.[0]?.icon)?.src} />
            <p>{todayWeather?.main?.temp}°</p>
          </div>
        )}
        {active === "Weekly" &&
          weeklyData?.map((weather: any) => (
            <div
              key={weather.day}
              className="text-center bg-white rounded-xl p-6"
            >
              <p className="mb-4">{getDay(weather?.dt_txt?.split(" ")[0])}</p>
              <img src={getWeatherIcon(weather?.weather?.[0]?.icon)?.src} />
              <p className="mt-3">{weather?.main?.temp}°</p>
            </div>
          ))}
      </div>
    </div>
  );
}
