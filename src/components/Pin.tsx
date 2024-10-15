import { Marker } from "react-map-gl";
import React from "react";
import { Coordinates } from "../App";

type PinProps = {
  marker: Coordinates;
  children: React.ReactNode;
};

export default function Pin({ marker, children }: PinProps){
  return(
    <Marker longitude={ marker[1] } latitude={ marker[0] } anchor="bottom">
      <div className="relative flex flex-col items-center w-full space-y-2">
        {children}
        <img src="/pin.svg" alt="logo" className="h-8 w-8 inline-block mr-2"/>
      </div>
    </Marker>
  )
};
