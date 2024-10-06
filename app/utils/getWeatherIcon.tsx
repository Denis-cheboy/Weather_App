import clearSky from "@/public/clear-sky.png";
import cloudy from "@/public/cloudy.png";
import rainy from "@/public/rainy.png";
import snow from "@/public/snowy.png";
import mist from "@/public/mist.png";
import ligtening from "@/public/lightning.png";

const getWeatherIcon = (code: string) => {
  switch (code) {
    case "01d":
      return clearSky;
    case "01n":
      return clearSky;
    case "02d":
      return cloudy;
    case "02n":
      return cloudy;
    case "03d":
    case "03n":
      return cloudy;
    case "04d":
    case "04n":
      return cloudy;
    case "09d":
    case "09n":
      return rainy;
    case "10d":
    case "10n":
      return rainy;
    case "11d":
    case "11n":
      return ligtening;
    case "13d":
    case "13n":
      return snow;
    case "50d":
    case "50n":
      return mist;
    default:
      return "default-weather.png";
  }
};

export default getWeatherIcon;
