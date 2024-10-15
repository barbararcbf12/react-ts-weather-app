import React, { useEffect, useState } from "react";
import { Map as MapGL, ViewState } from 'react-map-gl';
import Pin from "../Pin/Pin";
import 'mapbox-gl/dist/mapbox-gl.css';

export type ViewStateProps = ViewState & { width: number; height: number; };

type MapProps = {
  initialViewState?: ViewState;
  viewState: ViewStateProps;
  marker: number[];
  onClick: (lat: number, lang: number) => void;
  onMove: (viewState: ViewStateProps) => void;
};

function Map( props: MapProps ) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapGL
      interactive={true}
      dragPan={false}
      doubleClickZoom={false}
      scrollZoom={true}
      viewState={props.viewState}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_PUBLIC_KEY}
      initialViewState={props.initialViewState}
      style = {{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove ={(e) => props.onMove({...e.viewState, width: 0, height: 0})}
      onClick={(e) => props.onClick(e.lngLat.lat, e.lngLat.lng)}
      onLoad={() => setIsLoaded(true)}
    >
      <Pin marker={props.marker} />
    </MapGL>
  );
}

export default Map;
