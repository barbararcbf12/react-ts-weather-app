import React from 'react'
import "../styles/card.css"
import { TemperatureUnitEnum, WeatherData } from "../types";

type CardProps = {
  weather?: WeatherData;
  isFetching: boolean;
  unit: TemperatureUnitEnum;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const composeSrc = (icon?: string) => icon ? `http://openweathermap.org/img/w/${icon}.png` : "";

const getDay = () => new Date().getDay();
const getDate = () => (new Date().toDateString()).slice(3);
const formatTemperature = (temperature?: string, isFahrenheit?: boolean) => temperature && isFahrenheit ? Math.round(Number(temperature)) : Math.round(Number(temperature) - 273.15);

export default function Card({ weather, unit, isFetching }: CardProps) {
  const { icon, temperature, description, city, country } = weather ?? {};

  if(isFetching || !weather){
    return (
      <div className="card">
        <div
          className="inner flex items-center justify-center min-w-[15.5rem] min-h-[15.5rem] md:min-w-[20rem] md:min-h-[18rem]">
          <img width={70} height={70} className="loading" src="/loading.gif" alt=""/>
        </div>
      </div>
    )
  }

  const toggledTemperature = unit === 'celsius' ? `${ formatTemperature(temperature, false) }°C` : `${ formatTemperature(temperature, true) }°F`;

  return (
    <section className="card">
      <div className="inner space-y-4 min-w-[15.5rem] min-h-[15.5rem] md:min-w-[20rem] md:min-h-[18rem]">
        <header className="paragraph flex items-center justify-start space-y-4">
          <img src="/pin.svg" alt="logo" className="h-6 w-6 inline-block mr-2 text-white"/>
          <h2>{ city } { country }</h2>
        </header>
        <section  className="space-y-4">
          <p className="h2">{ DAYS[getDay()] }</p>
          <p className="paragraph">{ getDate() }</p>
          <img className="icon" src={ composeSrc(icon) } alt=""></img>
          <p className="h1">{ toggledTemperature }</p>
          <p className="h3">{ description }</p>
        </section>
      </div>
    </section>
  )
};
