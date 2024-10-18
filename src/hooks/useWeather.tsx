import { useState, useEffect } from "react";
import { fetchWeatherData } from "../api/fetchWeatherData";
import { Coordinates, WeatherData } from "../types";

export const useWeather = (initialCoordinates: Coordinates) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const getWeatherData = async (lat: number, long: number) => {
      setIsFetching(true);
      const data = await fetchWeatherData(lat, long);
      if (data) setWeatherData(data);
      setIsFetching(false);
    };

    // Fetch weather for initial coordinates
    getWeatherData(initialCoordinates[0], initialCoordinates[1]);
  }, [initialCoordinates]);

  return { weatherData, isFetching };
};
