import { WeatherData } from "../types";

const WEATHER_AP_KEY = process.env.REACT_APP_WEATHER_API_URL;
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export async function fetchWeatherData(lat: number, lang: number) {
  try{
    const res = await fetch(`${WEATHER_AP_KEY}?lat=${lat}&lon=${lang}&APPID=${OPEN_WEATHER_API_KEY}`,
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

    const obj: WeatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0]?.icon ?? ''
    };

    return obj;

  } catch (error) {
    console.error(error);
  }
};
