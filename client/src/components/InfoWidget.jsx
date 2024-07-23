import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { TranslateText } from "../pages/TrackOrders";
function InfoWidget() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <div className="flex flex-col justify-center items-center space-y-2 w-full md:w-[35%]">
      <p className="font-cairo text-black font-bold text-lg">
        {TranslateText[language].DeliveryAddress}
      </p>

      <div className="bg-gray-100 p-3 rounded-xl border-2 border-gray-300">
        <p className="font-cairo text-black text-lg flex-wrap">
          {TranslateText[language].Address}
        </p>
      </div>

      <div className="flex justify-center items-center space-x-2 p-3 rounded-md border-2 border-gray-300 w-full ">
        <img />
        <div className="flex flex-col justify-center items-center space-y-2 ">
          <p className="font-cairo text-black text-lg font-bold">
            {TranslateText[language].Problem}
          </p>

          <button className="bg-bosta px-12 py-3 text-white font-cairo rounded-xl">
            {TranslateText[language].ContactCustomerSupport}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoWidget;
