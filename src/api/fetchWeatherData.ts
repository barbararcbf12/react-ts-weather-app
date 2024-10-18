const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL as string;
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;

export async function fetchWeatherData(lat: number, long: number) {
  try{
    const res = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${long}&APPID=${OPEN_WEATHER_API_KEY}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0]?.icon ?? ''
    };

  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
