import { useState } from "react";
import TrackOrders from "./pages/TrackOrders";
import { Routes, Route } from "react-router-dom";
import { LanguageContextProvider } from "./context/LanguageContext";
import { ShipmentContextProvider } from "./context/ShipmentContext";
import { ShipmentQueryContextProvider } from "./context/ShipmentQueryContext";

function App() {
  return (
    <>
      <ShipmentContextProvider>
        <LanguageContextProvider>
          <ShipmentQueryContextProvider>
            <Routes>
              <Route path="/" element={<TrackOrders />} />
            </Routes>
          </ShipmentQueryContextProvider>
        </LanguageContextProvider>
      </ShipmentContextProvider>
    </>
  );
}

export default App;
