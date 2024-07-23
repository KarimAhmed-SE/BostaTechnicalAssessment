import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import ShipmentDetails from "../components/ShipmentDetails";
import InfoWidget from "../components/InfoWidget";
import { useLanguage } from "../context/LanguageContext";
import { useShipment } from "../context/ShipmentContext";
import { format } from "date-fns";
import { useShipmentQueryContext } from "../context/ShipmentQueryContext";

export const TranslateText = {
  en: {
    HomePage: "Home Page",
    Pricing: "Pricing",
    Resources: "Resources",
    TrackShipment: "Track Shipment",
    SignIn: "Sign In",
    ShipmentDetails: "Shipment Details",
    ShipmentNumber: "Shipment Number",
    VendorName: "Vendor Name",
    DeliveryDate: "Delivery Date",
    OrderHasBeenMade: "Order Has been Made",
    OrderHasBeenShipped: "Order Has been Shipped",
    OutForDelivery: "Out For Delivery",
    Delivered: "Delivered",
    LastUpdate: "Last Update",
    Branch: "Branch",
    CurrentDate: "Date",
    CurrentTime: "Time",
    Details: "Details",
    Problem: "Do you have a problem with your shipment?",
    ContactCustomerSupport: "Contact Customer Support",
    DeliveryAddress: "Delivery Address",
    Address:
      "Imbaba street, Talaat Harb, labour city, beside The Prince, House No. 17, block 22,,, Cairo",
    EnterTrackingNumber: "Enter Tracking Number",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    DELIVERED_TO_SENDER: "Not Delivered",
  },

  ar: {
    HomePage: "الصفحة الرئيسية",
    Pricing: "الاسعار",
    Resources: "كلم المبيعات",
    TrackShipment: "تتبع شحنتك",
    SignIn: "تسجيل الدخول",
    ShipmentDetails: "تفاصيل الشحنة",
    ShipmentNumber: "رقم الشحنة",
    VendorName: "اسم التاجر",
    DeliveryDate: "موعد التسليم",
    OrderHasBeenMade: "تم انشاء الشحنة",
    OrderHasBeenShipped: "تم استلام الشحنة من التاجر ",
    OutForDelivery: "الشحنة خرجت للتسليم",
    Delivered: "تم التسليم",
    LastUpdate: "اخر تحديث",
    Branch: "الفرع",
    CurrentDate: "التاريخ",
    CurrentTime: "الوقت",
    Details: "تفاصيل",
    Problem: "هل يوجد مشكلة في شحنتك ؟",
    ContactCustomerSupport: "ابلاغ عن مشكلة",
    DeliveryAddress: "عنوان التسليم",
    Address:
      "امبابة, شارع طلعت حرب, مدينة العمال بجوار البرنس, منزل 17 بلوك 22,, Cairo",
    EnterTrackingNumber: "ادخل رقم التتبع",
    DELIVERED: "تم  توصيل الشحنة",
    CANCELLED: "تم الغاء الشحنة",
    DELIVERED_TO_SENDER: "لم يتم تسليم الشحنة",
  },
};

function TrackOrders() {
  const { language, toggleLanguage } = useLanguage();
  const { shipment, setShipment } = useShipment();
  const { query, setQuery } = useShipmentQueryContext();

  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "text-delivered";
      case "CANCELLED":
        return "text-bosta";
      case "DELIVERED_TO_SENDER":
        return "text-notDelivered";
    }
  };

  const getState = (state) => {
    switch (state) {
      case "DELIVERED":
        return TranslateText[language].DELIVERED;
      case "CANCELLED":
        return TranslateText[language].CANCELLED;
      case "DELIVERED_TO_SENDER":
        return TranslateText[language].DELIVERED_TO_SENDER;
      default:
        return "Unknown";
    }
  };

  return (
    <div className="container mx-auto p-3">
      <Header setLoading={setLoading} />

      {loading ? (
        <div className="text-center text-4xl mt-10">
          {" "}
          Please enter a shipment tracking number in the "Track Shipment"
          section to view your shipment's status{" "}
        </div>
      ) : (
        <>
          <hr className="w-full absolute mx-auto left-0" />

          <div className="mx-auto border-2 border-gray-400 rounded-lg mt-16 w-full">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex justify-center items-center w-full p-4 border-b-2 space-x-5 border-gray-400 md:justify-between md:space-x-0">
                <div className="flex flex-col space-y-6">
                  <p className="font-cairo text-gray-400">
                    {TranslateText[language].ShipmentNumber}{" "}
                    {shipment.TrackingNumber}
                    {/*  */}
                  </p>
                  <p
                    className={`font-cairo font-bold text-xl ${getStatusColor(
                      shipment.CurrentStatus.state
                    )}`}
                  >
                    {getState(shipment.CurrentStatus.state)}
                  </p>
                </div>

                <div className="flex flex-col space-y-6">
                  <p className="font-cairo text-gray-400">
                    {TranslateText[language].LastUpdate}
                  </p>
                  <p className="font-cairo  font-bold text-xl">
                    {format(
                      new Date(shipment.CurrentStatus.timestamp),
                      "yyyy-MM-dd"
                    )}
                  </p>
                </div>

                <div className="flex flex-col space-y-6">
                  <p className="font-cairo text-gray-400">
                    {TranslateText[language].VendorName}
                  </p>
                  <p className="font-cairo  font-bold text-xl">
                    {shipment.provider}
                  </p>
                </div>

                <div className="flex flex-col space-y-6">
                  <p className="font-cairo text-gray-400">
                    {TranslateText[language].DeliveryDate}
                  </p>
                  <p className="font-cairo font-bold text-xl">
                    {format(
                      new Date(shipment.CurrentStatus.timestamp),
                      "yyyy-MM-dd"
                    )}
                  </p>
                </div>
              </div>

              <ProgressBar />
            </div>
          </div>

          {/* Details and delivery address */}

          <div className="block justify-center items-center  w-full mt-10 md:space-x-6 md:flex">
            <ShipmentDetails />

            <InfoWidget />
          </div>
        </>
      )}
    </div>
  );
}

export default TrackOrders;
