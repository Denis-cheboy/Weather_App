import HighlightCard from "./HightlightCard";
import getLocalTime from "../utils/getLocalTime";
export default function Highlights({ weatherData }: any) {
  const currentWeather = weatherData?.current?.current_weather;

  const visibilityStatus = (visibility: number) => {
    if (visibility > 6000) {
      return "Excellent 🎉 ";
    } else if (visibility < 5000 && visibility > 2000) {
      return "Good 😇 ";
    } else {
      return "Poor 😿 ";
    }
  };

  const localTime = ({ dt, timezone }: { dt: number; timezone: number }) => {
    const { date, time } = getLocalTime({
      weatherData: {
        dt: dt,
        timezone: timezone,
      },
    });
    return time;
  };
  const humidityLevel = (humidity: number) => {
    if (humidity > 70) {
      return "High";
    } else if (humidity > 40 && humidity < 70) {
      return "Moderate";
    } else {
      return "Low";
    }
  };

  const feelingStatus = (status: number) => {
    if (status > 30) {
      return "Hot";
    } else if (status > 10 && status < 30) {
      return "Warm";
    } else {
      return "Cold";
    }
  };
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Today's Highlights</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HighlightCard
          title="UV Index"
          type="uv"
          value={currentWeather?.main?.pressure}
        />
        <HighlightCard
          title="Wind Status"
          type="wind"
          value={currentWeather?.wind?.speed}
          unit="km/h"
          direction="WSW"
        />
        <HighlightCard
          title="Sunrise & Sunset"
          type="sun"
          sunrise={localTime({
            dt: Number(currentWeather?.sys?.sunrise),
            timezone: Number(currentWeather?.timezone),
          })}
          sunset={localTime({
            dt: Number(currentWeather?.sys?.sunset),
            timezone: Number(currentWeather?.timezone),
          })}
        />
        <HighlightCard
          title="Humidity"
          type="humidity"
          value={currentWeather?.main?.humidity}
          unit="%"
          status={humidityLevel(Number(currentWeather?.main?.humidity))}
        />
        <HighlightCard
          title="Visibility"
          type="visibility"
          value={currentWeather?.visibility}
          unit="km"
          status={visibilityStatus(Number(currentWeather?.visibility))}
        />
        <HighlightCard
          title="Temparatures"
          type="temperature"
          value={currentWeather?.main?.feels_like}
          status={feelingStatus(Number(currentWeather?.main?.feels_like))}
        />
      </div>
    </div>
  );
}
