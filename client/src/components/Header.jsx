import React, { useContext, useState } from "react";
import englishLogo from "../assets/Bosta.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { TranslateText } from "../pages/TrackOrders";
import { CiSearch } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { useShipment } from "../context/ShipmentContext";
import { useShipmentQueryContext } from "../context/ShipmentQueryContext";
import axios from "axios";

function Header({ setLoading }) {
  const { language, toggleLanguage } = useLanguage();
  const { shipment, setShipment } = useShipment();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleSearchSmall, setToggleSearchSmall] = useState(false);
  const { query, setQuery } = useShipmentQueryContext();
  const [search, setSearch] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleSearchBar = () => {
    setToggleSearch(!toggleSearch);
  };

  const handleMenuToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleQuerySubmission = async () => {
    setToggleSearch(false);

    try {
      const response = await axios.get(
        `https://tracking.bosta.co/shipments/track/${search}`
      );
      setShipment(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={` flex justify-between items-center border-gray-400 mx-auto`}
    >
      <img src={englishLogo} alt="logo" className="w-[10rem] h-[5rem]" />

      <div className="hidden lg:flex lg:space-x-12 lg:justify-center lg:items-center">
        <Link to={"#"} className="font-cairo font-bold text-xl">
          {TranslateText[language].HomePage}
        </Link>
        <Link to={"#"} className="font-cairo font-bold text-xl">
          {TranslateText[language].Pricing}
        </Link>
        <Link to={"#"} className="font-cairo font-bold text-xl">
          {TranslateText[language].Resources}
        </Link>
      </div>

      <div className="hidden lg:flex lg:space-x-12 lg:justify-center lg:items-center lg:relative">
        <button
          className={`font-bold text-xl font-cairo ${
            toggleSearch ? "text-bosta" : "text-black"
          }`}
          onClick={toggleSearchBar}
        >
          {TranslateText[language].TrackShipment}
        </button>

        {toggleSearch ? (
          <div className="flex flex-col p-6 border-2 border-gray-200 rounded-lg absolute z-30 top-14 -left-14 bg-white">
            <p className="font-cairo text-black text-lg font-bold">
              {TranslateText[language].TrackShipment}
            </p>

            <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder={TranslateText[language].EnterTrackingNumber}
                className="p-3 rounded-l-lg border-2 border-gray-300 border-r-0 h-10 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="bg-bosta text-white p-3 rounded-r-lg h-10"
                onClick={handleQuerySubmission}
              >
                <CiSearch />
              </button>
            </div>
          </div>
        ) : (
          <> </>
        )}
        <Link to={"#"} className="font-cairo font-bold text-xl">
          {TranslateText[language].SignIn}
        </Link>
        <button
          className=" font-cairo text-bosta font-bold text-xl"
          onClick={toggleLanguage}
        >
          {language === "en" ? "العربية" : "English"}
        </button>
      </div>

      <div className="relative">
        <button
          className="block text-2xl p-3 rounded-full hover:bg-gray-200 hover:cursor-pointer lg:hidden"
          onClick={handleMenuToggle}
        >
          <CiMenuBurger />
        </button>
        {toggleMenu && (
          <div className="absolute p-3 border-2 border-gray-300 flex flex-col justify-center items-center space-y-4 z-30 w-[14rem] bg-white top-18 right-1 lg:hidden ">
            <Link to={"#"} className="font-cairo font-bold text-xl">
              {TranslateText[language].HomePage}
            </Link>
            <Link to={"#"} className="font-cairo font-bold text-xl">
              {TranslateText[language].Pricing}
            </Link>
            <Link to={"#"} className="font-cairo font-bold text-xl">
              {TranslateText[language].Resources}
            </Link>

            <button
              className={`font-bold text-xl font-cairo ${
                toggleSearch ? "text-bosta" : "text-black"
              }`}
              onClick={() => {
                setToggleSearchSmall(!toggleSearchSmall);
                setToggleMenu(!toggleMenu);
              }}
            >
              {TranslateText[language].TrackShipment}
            </button>

            <Link to={"#"} className="font-cairo font-bold text-xl">
              {TranslateText[language].SignIn}
            </Link>
            <button
              className=" font-cairo text-bosta font-bold text-xl"
              onClick={toggleLanguage}
            >
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>
        )}

        {toggleSearchSmall && (
          <div
            className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center "
            onClick={() => {
              setToggleSearchSmall(!toggleSearchSmall);
            }}
          >
            <div
              className="flex flex-col p-6 border-2 border-gray-200 rounded-lg absolute z-50 mx-auto left-0 right-0 w-[18rem] bg-white"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <p className="font-cairo text-black text-lg font-bold">
                {TranslateText[language].TrackShipment}
              </p>

              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder={TranslateText[language].EnterTrackingNumber}
                  className="p-3 rounded-l-lg border-2 border-gray-300 border-r-0 h-10 focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="bg-bosta text-white p-3 rounded-r-lg h-10"
                  onClick={() => {
                    handleQuerySubmission();
                    setToggleSearch(!toggleSearch);
                  }}
                >
                  <CiSearch />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
