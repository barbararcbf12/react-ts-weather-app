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

  if (isFetching || !weatherData) {
    return (
      <CardWrapper>
        <div className="loading-dots"/>
      </CardWrapper>
    )
  }

  return (
    <CardWrapper>
      <header className="text-base flex flex-col items-start justify-start space-y-4">
        <div className="flex align-end">
          <img src="/pin.svg" alt="logo" className="h-6 w-6 inline-block mr-2 text-white"/>
          <h2 className="text-22 font-semibold">{city} {country}</h2>
        </div>
        <div className="flex flex-col space-y-1 leading-120">
          <time className="text-22 font-bold" dateTime={DAYS[getDay()]}>{DAYS[getDay()]}</time>
          <time dateTime={getDate()}>{getDate()}</time>
        </div>
      </header>
      <section className="flex space-x-4">
        <div className="flex flex-col justify-center leading-120">
          <p className="text-48 font-extrabold">{toggledTemperature}</p>
          <p className="text-22 font-bold">{description}</p>
        </div>
        <img width={100} height={100} src={composeSrc(icon)} alt=""/>
      </section>
    </CardWrapper>
  )
}

export default Card;

function CardWrapper({children}: {children: React.ReactNode} ) {
  return (
    <div className="card">
      <div
        className="inner space-y-4 md:space-y-0 flex flex-col justify-between min-w-[15.5rem] min-h-[14rem] md:min-w-[20rem] md:min-h-[18rem]">
        {children}
      </div>
    </div>
  )
}
