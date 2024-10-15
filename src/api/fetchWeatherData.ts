const WEATHER_AP_KEY = process.env.REACT_APP_WEATHER_API_URL;
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export async function fetchWeatherData(lat: number, lang: number) {
  try{
    const res = await fetch(`${WEATHER_AP_KEY}?lat=${lat}&lon=${lang}&APPID=${OPEN_WEATHER_API_KEY}`);

    const data = await res.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0]?.icon ?? ''
    };

  } catch (error) {
    console.error(error);
  }
}
