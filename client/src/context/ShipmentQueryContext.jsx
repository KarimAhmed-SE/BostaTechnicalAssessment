import React, { useContext, createContext, useState } from "react";

const ShipmentQueryContext = createContext();

export const useShipmentQueryContext = () => useContext(ShipmentQueryContext);

export function ShipmentQueryContextProvider({ children }) {
  const [query, setQuery] = useState("84043113");

  return (
    <ShipmentQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </ShipmentQueryContext.Provider>
  );
}
