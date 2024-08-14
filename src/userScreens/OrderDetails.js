import React, { useState, useRef } from "react";
import { getOrderDetails } from "../Helpers/getOrderDetials";
import { dateConvertor } from "../Helpers/dateConvertor";
import { useReactToPrint } from "react-to-print";

const OrderDetails = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState(null);
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "ShopReport",
    onAfterPrint: () => {
      // Perform any additional actions after printing
    },
  });

  const getOrderDetailsHandler = async () => {
    try {
      const details = await getOrderDetails(orderId);
      setOrderDetails(details || []);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to fetch order details."); // Set error message
      setOrderDetails([]); // Optionally clear order details on error
    }
  };
  console.log("orderDetails", orderDetails);
  const productDetails = orderDetails.isShop
    ? orderDetails?.cartIdBuyFromTheShop[0]?.shopData
    : orderDetails?.cartId || [];
  console.log("productDetails", productDetails);

  return (
    <div className="flex flex-col items-center mt-20 mb-4 justify-center">
      <div className="flex flex-row  items-center shadow-lg shadow-gray-800 p-4 w-1/2 justify-between mb-4  ">
        <input
          type="number"
          placeholder="Order ID"
          onChange={(e) => setOrderId(e.target.value)}
          className=" border-b p-0   
        w-half bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 
        text-white font-bold"
        />
        <button
          onClick={getOrderDetailsHandler}
          className="bg-blue-600 mt-5 p-1 text-white font-bold w-28"
        >
          Search
        </button>
        <button
          onClick={handlePrint}
          className="bg-yellow-600 mt-5 p-1 text-white font-bold w-28"
        >
          Print
        </button>
      </div>
      {orderDetails.length < 1 ? (
        <div className="flex flex-col items-center w-1/2">
          <p className="text-red-400 font-bold text-xl">No Order Found</p>
        </div>
      ) : (
        <div className="w-1/2 m-4" ref={printRef}>
          <div className="flex flex-row items-start shadow-md shadow-gray-800 justify-between">
            <p className="text-red-400">OrderID: </p>
            <p className="text-red-400">{orderDetails?.orderId || "--"}</p>
          </div>
          <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
            <p className="text-red-400">Order Date: </p>
            <p className="text-red-400">
              {dateConvertor(orderDetails?.createdAt || new Date())}
            </p>
          </div>
          <div className="flex flex-row items-start border-b-2 border-b-white justify-between">
            <p className="text-red-400">Payment ID </p>
            <p className="text-red-400">{orderDetails?.paymentId || "--"}</p>
          </div>
          <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
            <p className="text-red-400"> Order Status</p>
            <p className="text-red-400"> {orderDetails?.status || "--"}</p>
          </div>
          <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
            <p className="text-red-400"> delivery Charge: </p>
            <p className="text-red-400">
              ₹ {orderDetails?.deliveryCharges || "--"}
            </p>
          </div>
          <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
            <p className="text-red-400">Service Charge:</p>
            <p className="text-red-400">
              ₹ {orderDetails?.serviceCharges || "--"}
            </p>
          </div>
          <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
            <p className="text-red-400">Total Product Price: </p>
            <p className="text-red-400">
              ₹ {orderDetails?.totalPriceSum || "--"}
            </p>
          </div>
          <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
            <p className="text-red-400">Grand Total:</p>
            <p className="text-red-400">
              ₹ {orderDetails?.grandTotalPrice || "--"}
            </p>
          </div>

          <div>
            <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
              <p className="text-red-400">ShopName:</p>
              <p className="text-red-400">
                {orderDetails?.shopDetails?.ShopName || "--"}
              </p>
            </div>
            <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
              <p className="text-red-400">status:</p>
              <p className="text-red-400">
                {orderDetails?.shopDetails?.status || "--"}
              </p>
            </div>
          </div>
          <div className="justify-center items-center">
            <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
              <p className="text-red-400">Customer Name:</p>
              <p className="text-red-400">
                {orderDetails?.customerAddress?.customerPermanentAddress
                  ?.username || "--"}
              </p>
            </div>
            <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
              <p className="text-red-400">Mobile Number:</p>
              <p className="text-red-400">
                {orderDetails?.customerAddress?.customerPermanentAddress
                  ?.mobileNumber || "--"}
              </p>
            </div>
            <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
              <p className="text-red-400">Email:</p>
              <p className="text-red-400">
                {orderDetails?.customerAddress?.customerPermanentAddress
                  ?.email || "--"}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-red-400">Customer Address:</p>
              <p className="text-red-400">
                {orderDetails?.customerAddress?.localAddress
                  ?.apartmentRoadArea || "--"}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-red-400">&nbsp;</p>
              <p className="text-red-400">
                {orderDetails?.customerAddress?.localAddress?.ouseFlatBlockNo ||
                  "--"}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-red-400">&nbsp;</p>
              <p className="text-red-400">
                {orderDetails?.customerAddress?.localAddress?.pinCode || "--"}
              </p>
            </div>
            <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
              <p className="text-red-400">&nbsp;</p>
              <p className="text-red-400">
                {orderDetails?.customerAddress?.localAddress?.placeName || "--"}
              </p>
            </div>
            <div className="flex flex-row items-center border-b-2 border-b-white justify-between">
              <p className="text-red-400">Location Type:</p>
              <p className="text-red-400">
                {orderDetails?.customerAddress?.localAddress?.locationType ||
                  "--"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-red-400 font-bold my-4">PRODUCTS</p>
            {productDetails.map((product) => (
              <div
                key={product._id}
                className="flex flex-row items-center border-b-2 border-b-white justify-between"
              >
                <p className="text-red-400 w-44 ">
                  {product?.name || product?.cart?.name}{" "}
                </p>
                <p className="text-red-400">
                  {product?.count || product?.quantity}{" "}
                </p>
                <p className="text-red-400">
                  {product?.miligram || product?.cart?.miligram} ML
                </p>
                <p className="text-red-400 ">
                  ₹ {product?.price || product?.cart?.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
