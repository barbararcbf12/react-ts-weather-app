import React, { useMemo } from 'react';
import { Coordinates, TemperatureUnitEnum } from "../types";
import { getDate, getDay } from "../utils/dateFunctions";
import { formatTemperature } from "../utils/formatTemperature";
import { useWeather } from "../hooks/useWeather";

type CardProps = {
  position: Coordinates;
  unit: TemperatureUnitEnum;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const composeSrc = (icon?: string) => icon ? `http://openweathermap.org/img/w/${icon}.png` : "";

function Card({ unit, position }: CardProps) {
  const { weatherData, isFetching } = useWeather(position);
  const { icon, temperature, description, city, country } = weatherData ?? {};

  const toggledTemperature = useMemo(() => {
    return unit === 'celsius' ? `${formatTemperature(temperature, false)}°C` : `${formatTemperature(temperature, true)}°F`;
  }, [temperature, unit]);

  if(isFetching || !weatherData){
    return (
      <div className="card">
        <div
          className="inner flex items-center justify-center min-w-[15.5rem] min-h-[15.5rem] md:min-w-[20rem] md:min-h-[18rem]">
          <div className="loading-dots"/>
          {/*<img width={70} height={70} className="loading" src="/loading.gif" alt="Loading..."/>*/ }
        </div>
      </div>
    )
  }

  return (
    <section className="card">
      <div className="inner space-y-4 min-w-[15.5rem] min-h-[15.5rem] md:min-w-[20rem] md:min-h-[18rem]">
        <header className="paragraph flex items-center justify-start space-y-4">
          <img src="/pin.svg" alt="logo" className="h-6 w-6 inline-block mr-2 text-white"/>
          <h2>{ city } { country }</h2>
        </header>
        <section className="space-y-4">
          <p className="h2">{ DAYS[getDay()] }</p>
          <p className="paragraph">{ getDate() }</p>
        </section>
        <section className="space-y-4">
          <img width="120px" height="120px" className="icon" src={ composeSrc(icon) } alt=""></img>
          <p className="h1">{ toggledTemperature }</p>
          <p className="h3">{ description }</p>
        </section>
      </div>
    </section>
)
};

export default Card;