import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="space-y-3 h-screen">
      <Header />
      <main className="p-3">
        <div className="rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-elevation-01 w-full">
          Main content
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
