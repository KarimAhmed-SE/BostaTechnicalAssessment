import React, { useContext } from "react";
import { useLanguage } from "../context/LanguageContext";
import { TranslateText } from "../pages/TrackOrders";
import { useShipment } from "../context/ShipmentContext";
import { format } from "date-fns";

function ShipmentDetails() {
  const { language, toggleLanguage } = useLanguage();
  const { shipment, setShipment } = useShipment();

  return (
    <div className="flex flex-col justify-center items-center space-y-2 w-full md:w-[65%]">
      <p className="font-cairo text-black font-bold text-lg">
        {TranslateText[language].ShipmentDetails}
      </p>
      <table className="w-full ">
        <tr className="bg-gray-100 ">
          <td className="w-32 h-10 p-3 font-cairo text-gray-500 rounded-l-xl">
            {TranslateText[language].Branch}
          </td>
          <td className="w-32 h-10 p-3 font-cairo text-gray-500">
            {TranslateText[language].CurrentDate}
          </td>
          <td className="w-32 h-10 p-3 font-cairo text-gray-500">
            {TranslateText[language].CurrentTime}
          </td>
          <td className="w-48 h-10 p-3 font-cairo text-gray-500 rounded-r-xl">
            {TranslateText[language].Details}
          </td>
        </tr>

        {shipment.TransitEvents.map((event) => (
          <tr key={event.id}>
            <td className="w-32 h-10 p-3 font-cairo text-black rounded-l-xl">
              {event.hub ? event.hub : ""}
            </td>
            <td className="w-32 h-10 p-3 font-cairo text-black">
              {format(new Date(event.timestamp), "yyyy-MM-dd")}
            </td>
            <td className="w-32 h-10 p-3 font-cairo text-black">
              {format(new Date(event.timestamp), "HH:mm")}
            </td>
            <td className="w-48 h-10 p-3 font-cairo text-black rounded-r-xl">
              {event.state}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ShipmentDetails;
