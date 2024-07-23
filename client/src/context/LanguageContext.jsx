import React, { useState, useContext, createContext } from "react";

const languageContext = createContext();

export const useLanguage = () => useContext(languageContext);

export function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
  };

  return (
    <languageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </languageContext.Provider>
  );
}
