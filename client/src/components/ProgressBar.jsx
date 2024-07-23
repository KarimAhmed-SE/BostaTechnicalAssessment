import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackage } from "react-icons/lu";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { TranslateText } from "../pages/TrackOrders";
import { useLanguage } from "../context/LanguageContext";
import { useShipment } from "../context/ShipmentContext";

function ProgressBar() {
  const { language, toggleLanguage } = useLanguage();
  const { shipment, setShipment } = useShipment();

  const getStatusColorMilestones = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-delivered border-2 border-delivered bg-delivered text-white";
      case "CANCELLED":
        return "bg-bosta border-2 border-bosta bg-bosta text-white";
      case "DELIVERED_TO_SENDER":
        return "bg-notDelivered border-2 border-notDelivered bg-notDelivered text-white";
      default:
        return "border-2 border-gray-400 bg-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-delivered w-[100%]";
      case "CANCELLED":
        return "bg-bosta w-[70%]";
      case "DELIVERED_TO_SENDER":
        return "bg-notDelivered w-[70%]";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className={`flex justify-center items-center w-full p-4 h-32 md:h-28`}>
      <ul className="list-none flex justify-between items-center  relative z-0 h-2 rounded-full w-full  bg-gray-400">
        <li className=" flex flex-col justify-start text-center relative top-5 sm:top-3 md:top-2.5">
          <span
            className={`h-10 w-10 flex justify-center items-center rounded-full  relative z-20   ${getStatusColorMilestones(
              shipment.CurrentStatus.state
            )} `}
          >
            <FaHeart />
          </span>
          <span className="font-cairo font-bold text-sm">
            {TranslateText[language].OrderHasBeenMade}
          </span>
        </li>
        <li className=" flex flex-col justify-center items-center text-center relative top-5 sm:top-3 md:top-2.5">
          <span
            className={`h-10 w-10 flex justify-center items-center rounded-full  relative z-20  ${getStatusColorMilestones(
              shipment.CurrentStatus.state
            )} `}
          >
            <LuPackage />
          </span>
          <span className="font-cairo font-bold text-sm">
            {TranslateText[language].OrderHasBeenShipped}
          </span>
        </li>
        <li className=" flex flex-col justify-center items-center text-center relative top-5 sm:top-3 md:top-2.5">
          <span
            className={`h-10 w-10 flex justify-center items-center rounded-full  relative z-20  ${getStatusColorMilestones(
              shipment.CurrentStatus.state
            )}`}
          >
            <TbTruckDelivery />
          </span>
          <span className="font-cairo font-bold text-sm">
            {TranslateText[language].OutForDelivery}
          </span>
        </li>
        <li className="flex flex-col justify-end items-center text-center relative top-3 sm:top-3 md:top-2.5">
          <span
            className={`h-10 w-10 left-3 flex justify-center items-center rounded-full  relative z-20  ${getStatusColorMilestones(
              shipment.CurrentStatus.state
            )}`}
          >
            <IoIosCheckmarkCircle />
          </span>
          <span className="font-cairo font-bold text-sm">
            {TranslateText[language].Delivered}
          </span>
        </li>

        <div
          className={`absolute h-2 z-10  ${getStatusColor(
            shipment.CurrentStatus.state
          )}`}
        ></div>
      </ul>
    </div>
  );
}

export default ProgressBar;
