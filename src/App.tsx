import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";

function App() {
  return (
    <div className="relative h-screen">
      <Header />
      <main>
        <Map />
      </main>
      <Footer />
    </div>
  );
}

export default App;
