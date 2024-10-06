interface WeatherData {
  dt: number;
  timezone: number;
}
const getLocalTime = ({ weatherData }: { weatherData: any }) => {
  const timestamp = weatherData.dt * 1000; // Convert to milliseconds
  const date = new Date(timestamp);

  // Adjust for timezone offset (timezone is in seconds, convert to hours)
  const timezoneOffset = weatherData.timezone / 3600;
  date.setHours(date.getHours() + timezoneOffset);

  return {
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    date: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
};

export default getLocalTime;
