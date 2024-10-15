import { Marker } from "react-map-gl";
import React from "react";
import { Coordinates, WeatherData } from "../../App";
import Card from "../Card/Card";

type PinProps = {
  marker: Coordinates;
  weatherData?: WeatherData;
};

export default function Pin({ marker, weatherData }: PinProps){
  return(
    <Marker longitude={ marker[1] } latitude={ marker[0] } anchor="bottom">
      <div className="relative flex flex-col items-center w-full space-y-2">
        <Card weather={ weatherData } isFetching={ false }/>
        <img src="/pin.svg" alt="logo" className="h-8 w-8 inline-block mr-2"/>
      </div>
    </Marker>
  )
};
