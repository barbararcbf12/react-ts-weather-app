import React from "react";
import { Map as MapGL, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/react-mapbox.css';
import { ViewStateProps } from "../types";

type MapProps = {
  initialViewState?: ViewState;
  viewState: ViewStateProps;
  onClick: (lat: number, lang: number) => void;
  onMove: (viewState: ViewStateProps) => void;
  children: React.ReactNode;
};

const MAPBOX_PUBLIC_KEY = process.env.REACT_APP_MAPBOX_PUBLIC_KEY;

function Map( props: MapProps ) {

  return (
    <MapGL
      interactive={true}
      dragPan={true}
      doubleClickZoom={true}
      scrollZoom={true}
      viewState={props.viewState}
      mapboxAccessToken={MAPBOX_PUBLIC_KEY}
      initialViewState={props.initialViewState}
      style = {{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => props.onMove({...e.viewState, width: window.innerWidth, height: window.innerHeight})}
      onClick={(e) => props.onClick(e.lngLat.lat, e.lngLat.lng)}
    >
      {props.children}
    </MapGL>
  );
}

export default Map;
