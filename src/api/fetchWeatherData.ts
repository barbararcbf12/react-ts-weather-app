import React from "react";
import { WeatherData } from "../App";

export async function fetchWeatherData(lat: number, lang: number, setWeatherData:  React.Dispatch<React.SetStateAction<WeatherData | undefined>>) {
  try{
    const res = await fetch(`${process.env.REACT_APP_WEATHER_API_URL}?lat=${lat}&lon=${lang}&APPID=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
      // Adding mode as a second parameter to the fetch function solved the CORS issue
      // but TS doesn't recognize the second parameter as a valid option,
      // therefore I added @ts-ignore to ignore the error
      { mode: 'cors' },
      // @ts-ignore
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    const data = await res.json();
    let obj = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0]?.icon ?? ''
    };
    setWeatherData(obj);
  } catch (error) {
    console.error(error);
  }
};
