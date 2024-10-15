import React, { useState } from "react";
import Header from "./components/Header/Header";
import Map, { ViewStateProps } from "./components/Map/Map";

export type Position = number[];

const initialCoordinates: Position =  [55.676098, 12.568337];
const initialViewState: ViewStateProps = {
  latitude: 55.676098,
  longitude: 12.568337,
  zoom: 10,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
  width: 100,
  height: 100
}

const setMapCenter = (position: Position): Position => {
  if(position as Position) return position;
  else return initialCoordinates;
}

function App() {
  const [viewState, setViewState] = useState<ViewStateProps>(initialViewState);
  const [marker, setMarker] = useState<Position>(setMapCenter(initialCoordinates));

  const handleOnClick = (lat: number, lang: number) => {
    setMarker([lat, lang]);
    setViewState( (prevState) => ({
        ...prevState,
        longitude: lang,
        latitude: lat,
        zoom: 8
      }
    ))
  };

  const handleOnMove = (viewState: ViewStateProps) => setViewState(viewState);

  return (
    <div className="relative h-screen">
      <Header />
      <main>
        <Map
          initialViewState={initialViewState}
          viewState={viewState}
          marker={marker}
          onClick={handleOnClick}
          onMove={handleOnMove}
        />
      </main>
    </div>
  );
}

export default App;
