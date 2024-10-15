import React from "react";
import { Map as ReactMapGL } from 'react-map-gl';

function Map() {
  return (
    <section className="w-full text-primary-900 flex justify-between items-start">
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_PUBLIC_KEY}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style = {{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </section>
  );
}

export default Map;
