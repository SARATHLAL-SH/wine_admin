import React, { useState, useEffect } from "react";
import LocationSelector from "../Components/LocationSelector";
import { handleImageChange } from "../Helpers/addProductScreen/handleImageChange";
import axios from "axios";
import { API } from "../utils/apiUtils";
import { notifyError, notifySuccess } from "../Helpers/toaster";
import { sendOTP } from "../Components/AddProductScreen/sendOtp";
import { verifyOTP } from "../Helpers/addProductScreen/verifyOtp";
import DeleteShop from "../Components/AddShopScreen/DeleteShop";

const dotenv = require("dotenv");
dotenv.config();

function AddShopScreen() {
  const [shopData, setShopData] = useState({
    shopName: "",
    place: "",
    mobileNumber: "",
    otp: "",
  });
  const [place, setPlace] = useState("");
  const [imageURL, setImageURL] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isMobileNumber, setIsMobileNumber] = useState(false);
  const [isSendOTP, setIsSendOTP] = useState(false);
  const [isVerify, setIsverify] = useState(false);

  const { lat, lng } = markerPosition || {};

  const handleChannge = (e) => {
    const { name, value } = e.target;
    setShopData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mobileNumberhandleChannge = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setShopData({
        ...shopData,
        mobileNumber: value,
      });
    }

    if (value.length === 10) {
      setIsMobileNumber(true);
    } else {
      setIsMobileNumber(false);
    }
  };
  const getGeocode = async () => {
    const apiKey = process.env.REACT_APP_MAP_KEY;
    console.log("api key", apiKey);
    try {
      console.log("marker position", markerPosition);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const address = response?.data?.results[0]?.formatted_address;
      console.log(address);
      setLocationName(address);
      console.log(address);
    } catch (error) {
      console.error("Error fetching the location name:", error);
    }
  };

  useEffect(() => {
    getGeocode();
  }, [markerPosition, getGeocode]);

  const createShopHandler = async () => {
    const data = {
      ShopName: shopData.shopName,
      placeName: shopData.place,
      availableCategory: [],
      images: imageURL,
      latitude: lat,
      longitude: lng,
      mobileNumber: shopData.mobileNumber,
      address: locationName,
    };
    console.log(data);
    if (
      shopData.place &&
      shopData.shopName &&
      selectedImage &&
      lat &&
      lng &&
      shopData.mobileNumber.length === 10
    ) {
      try {
        console.log(API + "/create-wineshop", data);
        const response = await axios.post(API + "/create-wineshop", data);
        if (response.data) {
          notifySuccess("Shop created successfully");
          setShopData({
            shopName: "",
            place: "",
            mobileNumber: "",
            otp: "",
          });
          setIsMobileNumber(false);
          setIsSendOTP(false);
          setLocationName("");
          setSelectedImage(null);
        }
      } catch (error) {
        console.log(error);
        notifyError(error?.response?.data?.message);
      }
    } else {
      notifyError("Please fill all the fields");
    }
  };

  const sendOTPHandler = () => {
    if (shopData.mobileNumber.length === 10) {
      sendOTP(shopData.mobileNumber);
      setIsSendOTP(true);
    } else {
      notifyError("Please enter a valid mobile number");
      setIsSendOTP(false);
    }
  };
  const verifyOTPHandler = () => {
    if (shopData.otp.length === 4) {
      verifyOTP(shopData.otp, shopData.mobileNumber, setIsverify);
    } else {
      notifyError("Please enter a valid OTP");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-radiant-homebackground pt-16 flex-col h-screen md:flex-row md:items-start">
      <div className="  flex flex-col ml-0 mt-3 shadow-lg shadow-gray-800  h-3/2 p-3 items-start justify-between  md:ml-0">
        <h1 className="text-blue-400 text-5xl font-bold opacity-25 ">
          Add New Shop
        </h1>
        <div className="flex flex-row align-center   justify-between ">
          <p className="mt-5 min-w-36 mr-5 font-bold text-white">Shop Name</p>
          <input
            type="text"
            name="shopName"
            value={shopData.shopName}
            onChange={handleChannge}
            placeholder="Shop Name"
            className=" border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold"
          />
        </div>
        <div className="flex flex-row  align-center justify-between ">
          <p className="mt-5 min-w-36 mr-5 font-bold text-white">Place</p>
          <input
            type="text"
            name="place"
            value={shopData.place}
            onChange={handleChannge}
            placeholder="Place"
            className=" border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold"
          />
        </div>
        <div className="flex flex-row  align-center justify-between ">
          <p className="mt-5 min-w-36 mr-5 font-bold text-white">
            Mobile Number
          </p>
          <input
            type="number"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
              margin: "0",
            }}
            maxLength={10}
            name="mobileNumber"
            value={shopData.mobileNumber}
            onChange={mobileNumberhandleChannge}
            placeholder="Mobile Number"
            className=" border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold"
          />
          {isMobileNumber && (
            <button
              type="button"
              onClick={sendOTPHandler}
              className="mt-5 mr-5   text-white font-bold text-sm  rounded-full hover:text-red-600"
            >
              Send OTP
            </button>
          )}
        </div>
        {isSendOTP && (
          <div className="flex flex-row  align-center justify-between ">
            <p className="mt-5 min-w-36 mr-5 font-bold text-white">&nbsp;</p>
            <input
              type="text"
              name="otp"
              value={shopData.otp}
              onChange={handleChannge}
              placeholder="OTP"
              className=" border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold"
            />
            <button
              type="button"
              onClick={verifyOTPHandler}
              className="mt-5 mr-5  text-white font-bold text-sm  rounded-full hover:text-red-600"
            >
              verify
            </button>
          </div>
        )}
        <div className="flex flex-row  align-center justify-between ">
          <p className="mt-5 min-w-36 mr-5 font-bold text-white">Location</p>
          <textarea
            type="text"
            name="location"
            value={locationName}
            placeholder="Select From Map"
            className=" border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold"
          />
        </div>
        <div className="flex flex-row  align-center justify-between ">
          <p className="mt-5 min-w-36 mr-5 font-bold text-white">Image</p>
          <input
            type="file"
            onChange={(e) =>
              handleImageChange(e, setImageURL, setSelectedImage)
            }
            className=" mt-5  p-1 w-full bg-transparent  text-blue-400 font-bold"
          />
          {selectedImage && (
            <>
              <img
                src={selectedImage}
                alt="Selected"
                className="w-32 h-32 object-cover mb-5  border-2 border-gray-300"
              />
              <button
                name="button"
                className="bg-red-600 text-white ml-2 rounded-md font-bold pb-1 w-7 h-3 flex justify-center items-center "
                onClick={() => setSelectedImage(null)}
              >
                x
              </button>
            </>
          )}
        </div>
        <div className="mt-5 ">
          <button
            name="button"
            className="bg-green-600 text-white hover:bg-green-400 font-bold  p-2 "
            onClick={createShopHandler}
          >
            Create Shop
          </button>
        </div>
      </div>

      <div className="h-3/4 w-3/4 md:w-1/2 shadow-lg shadow-gray-800 px-4  m-3 items-center justify-center  ">
        <LocationSelector
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
        <DeleteShop />
      </div>
    </div>
  );
}

export default AddShopScreen;
