import React, { useEffect, useState } from "react";
import { fetchShopRequests } from "../Redux/Slices/shopRequestslice";
import { useDispatch, useSelector } from "react-redux";
import { dateConvertor } from "../Helpers/dateConvertor";
import axios from "axios";
import { notifyError, notifySuccess } from "../Helpers/toaster";
import { API } from "../utils/apiUtils";

const ShopRequests = () => {
  const [shopRequests, setShopRequests] = useState([]);
  const dispatch = useDispatch();

  const getShopRequests = () => {
    const requests = dispatch(fetchShopRequests()).then((response) => {
      setShopRequests(response.payload.slice().reverse());
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getShopRequests(); // Call every 10 minutes
    }, 100000);

    return () => clearInterval(intervalId);
  }, [getShopRequests]);

  const updateHandler = async (id) => {
    try {
      console.log(id);
      const response = await axios.put(`${API}/update/isUpdate/true/${id}`);
      if (response.data) {
        console.log(response.data);
        getShopRequests();
        notifySuccess("Data updated");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      notifyError(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col   ">
      <div className="flex flex-col h-screen w-full justify-start items-start">
        <h1 className="text-4xl font-bold pt-20 opacity-10">
          REQUEST FROM SHOPS
        </h1>
        <button
          type="button "
          onClick={getShopRequests}
          className="hover:bg-blue-800 bg-blue-600 text-white font-bold rounded-md p-2 m-2"
        >
          Refresh
        </button>
        <div className="flex flex-col h-4/5 w-4/5  overflow-y-auto ">
          {shopRequests.map((requests) => (
            <div
              key={requests._id}
              className="flex flex-col text-white shadow-lg shadow-gray-800  p-4 font-bold "
            >
              <div className="flex flex-row justify-between ">
                <p>{requests?.shopId?.ShopName}</p>
                <p className="text-sm">{dateConvertor(requests.createdAt)}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>{requests.name}</p>
                <p>{requests.description}</p>
              </div>
              <div className="flex flex-row justify-between">
                <a
                  href={requests.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={requests.image} alt="Image" className="w-24 h-20" />
                </a>
                <p>{requests.price}</p>
              </div>
              <div className="flex flex-row justify-between">
                <label
                  htmlFor="checkbox"
                  className={`flex items-center ${
                    requests.isUpdate ? `text-green-400` : `text-red-400`
                  } `}
                >
                  <input
                    type="checkbox"
                    className="pl-4"
                    checked={requests.isUpdate}
                    onChange={() => updateHandler(requests._id)}
                  />
                  {requests.isUpdate ? " updated" : " Not updated"}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopRequests;
