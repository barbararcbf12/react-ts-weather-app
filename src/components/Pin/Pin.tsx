import { Marker } from "react-map-gl";
import React from "react";
import { Position } from "../../App";

type PinProps = {
  marker: Position;
}

export default function Pin({ marker }: PinProps){
  return(
    <Marker longitude={ marker[1] } latitude={ marker[0] } anchor="bottom">
      <img src="/pin.svg" alt="logo" className="h-8 w-8 inline-block mr-2" />
    </Marker>
  )
};
