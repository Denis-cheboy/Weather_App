"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

interface SearchBarProps {
  handleWeatherUpdate: (data: any) => void;
}
export default function SearchBar({ handleWeatherUpdate }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchIntialLocation = async () => {
      try {
        // If no location entered, try to get the current geolocation
        const geolocation = await getGeolocation();
        if (geolocation) {
          const { lat, lng } = geolocation;
          const locationName = await getLocationName(lat, lng);
          if (locationName) {
            const weatherData = await fetchWeatherByLocation(locationName);
            handleWeatherUpdate(weatherData);
          } else {
            enqueueSnackbar(
              "City does not exits, Kindly try a known city/country",
              {
                variant: "error",
              }
            );
          }
        } else {
          enqueueSnackbar(
            "City does not exits, Kindly try a known city/country",
            {
              variant: "error",
            }
          );
        }
      } catch (err) {}
    };
    fetchIntialLocation();
  }, []);
  const getGeolocation = async (): Promise<{
    lat: number;
    lng: number;
  } | null> => {
    try {
      const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const response = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`,
        {}
      );
      const { location } = response.data;
      return { lat: location.lat, lng: location.lng };
    } catch (error) {
      return null;
    }
  };

  const getLocationName = async (
    lat: number,
    lng: number
  ): Promise<string | null> => {
    try {
      const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const results = response.data.results;
      if (results.length > 0) {
        return results[results.length - 2].formatted_address.split(",")[0]; // Get the last result as the location name
      }
    } catch (error) {}
    return null;
  };
  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const BE_HOST = process.env.NEXT_PUBLIC_BACKEND_URL;
        const weatherData = await axios.get(
          `${BE_HOST}/api/weather?q=${searchTerm}`
        );
        handleWeatherUpdate(weatherData.data);
      } catch (error) {
        enqueueSnackbar(
          "City does not exits, Kindly try a known city/country",
          {
            variant: "error",
          }
        );
      }
    } else {
      // If no location entered, try to get the current geolocation
      const geolocation = await getGeolocation();
      if (geolocation) {
        const { lat, lng } = geolocation;
        const locationName = await getLocationName(lat, lng);
        if (locationName) {
          const weatherData = await fetchWeatherByLocation(locationName);
          handleWeatherUpdate(weatherData);
        } else {
          enqueueSnackbar(
            "City does not exits, Kindly try a known city/country",
            {
              variant: "error",
            }
          );
        }
      } else {
        enqueueSnackbar(
          "City does not exits, Kindly try a known city/country",
          {
            variant: "error",
          }
        );
      }
    }
  };

  // Function to fetch weather by location name
  const fetchWeatherByLocation = async (location: string) => {
    try {
      const BE_HOST = process.env.NEXT_PUBLIC_BACKEND_URL;
      const weatherData = await axios.get(
        `${BE_HOST}/api/weather?q=${location}`
      );
      return weatherData.data;
    } catch (error) {}
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="relative mb-6 bg-white flex items-center">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search for places ..."
          className="w-full py-1 pl-1 pr-4 outline-none border border-gray-300 text-black"
        />
        <button
          onClick={handleSearch}
          className="ml-1 px-1 py-1 rounded-full bg-black text-white"
        >
          search
        </button>
      </div>
    </div>
  );
}
