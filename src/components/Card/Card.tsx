import React from 'react'
import "../../styles/card.css"
import { TemperatureUnitEnum, WeatherData } from "../../App";

type CardProps = {
  weather?: WeatherData;
  isFetching: boolean;
  unit: TemperatureUnitEnum;
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Card(props: CardProps) {
  if(!props.weather) return null;

  const { icon, temperature, description, city, country } = props.weather ?? {};
  let src = `http://openweathermap.org/img/w/${icon}.png`;

  const toggledTemperature = props.unit === 'celsius' ? `${ Math.round(Number(temperature) - 273.15) }°C` : `${ Math.round(Number(temperature)) }°F`;

  if (!props.isFetching)
    return (
      <div className="card">
        <div className="inner space-y-4">
          <div className="paragraph flex">
            <img src="/pin.svg" alt="logo" className="h-6 w-6 inline-block mr-2 text-white"/>
            <h2>{ city } { country }</h2>
          </div>
          <p className="h2">{days[new Date().getDay()]}</p>
          <p className="paragraph">{(new Date().toDateString()).slice(3)}</p>
          <img className="icon" src={src} alt=""></img>
          <p className="h1">{ toggledTemperature }</p>
          <p className="h3">{ description }</p>
        </div>
      </div>
    )
  else return (
    <div className="card">
      <div className="inner flex items-center justify-center min-w-[201px] min-h-[248px] md:min-w-[233px] md:min-h-[288px]">
        <img width={100} height={100} className="loading" src="/loading.gif" alt=""/>
      </div>
    </div>
  )
};
