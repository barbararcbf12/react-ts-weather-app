import { Marker } from "react-map-gl";
import React from "react";
import { Position } from "../../App";
import Card from "../Card/Card";

type PinProps = {
  marker: Position;
};

const mockWeatherData = {
  city: "Copenhagen",
  country: "Denmark",
  temperature: 10,
  description: "overcast clouds",
  icon: "04d"
};

export default function Pin({ marker }: PinProps){
  return(
    <Marker longitude={ marker[1] } latitude={ marker[0] } anchor="bottom">
      <div className="relative flex flex-col items-center w-full space-y-2">
        <Card weather={ mockWeatherData } isFetching={ false }/>
        <img src="/pin.svg" alt="logo" className="h-8 w-8 inline-block mr-2"/>
      </div>
    </Marker>
  )
};
