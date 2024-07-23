import React, { useContext, useState, createContext } from "react";

const ShipmentContext = createContext();

export const useShipment = () => useContext(ShipmentContext);

export function ShipmentContextProvider({ children }) {
  const [shipment, setShipment] = useState({});
  return (
    <ShipmentContext.Provider value={{ shipment, setShipment }}>
      {children}
    </ShipmentContext.Provider>
  );
}
