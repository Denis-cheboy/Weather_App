"use client";
import SearchBar from "./SearchBar";
import WeeklyForecast from "./WeeklyForecast";
import CurrentWeather from "./CurrentWeather";
import Highlights from "./Highlights";
import { useState } from "react";
import { motion } from "framer-motion";

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherUpdate = (data: any) => {
    setWeatherData(data);
  };
  return (
    <motion.div
      className="w-full bg-white shadow-lg h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px,1fr]">
        <motion.div
          className="p-6"
          initial={{ opacity: 0, translateX: -100 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchBar handleWeatherUpdate={handleWeatherUpdate} />
          <CurrentWeather weatherData={weatherData} />
        </motion.div>

        <motion.div
          className="bg-gray-50 p-6"
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <WeeklyForecast weatherData={weatherData} />
          <Highlights weatherData={weatherData} />
        </motion.div>
      </div>
    </motion.div>
  );
}
