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

interface UniqueWeatherItem extends WeatherItem {
  date: string;
}

interface UniqueDatesMap {
  [key: string]: UniqueWeatherItem;
}

const extractUniqueDates = (data: WeatherItem[]): UniqueWeatherItem[] => {
  if (!data) return [];

  const uniqueDates: UniqueDatesMap = {};

  data.forEach((item: WeatherItem) => {
    if (!item.dt_txt) return;

    const date = item.dt_txt.split(" ")[0]; // Extract just the date part

    if (!uniqueDates[date]) {
      uniqueDates[date] = {
        ...item,
        date,
      };
    }
  });

  // Convert the object to an array and sort by date
  return Object.values(uniqueDates).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

export default extractUniqueDates;
