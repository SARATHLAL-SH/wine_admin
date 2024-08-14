import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ handleSideBarToggle, isSideBarOpen }) {
  const location = useLocation();

  const menu = [
    {
      name: "Order Details",
      link: "/OrderDetails",
    },
    {
      name: "Verification",
      link: "/Verification",
    },
    {
      name: "Shop Requests",
      link: "/shopRequests",
    },
    {
      name: "About",
      link: "/About",
    },
    {
      name: "Logout",
      link: "/Signout",
    },
  ];
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="sticky-top-0">
      <div className="bg-radiant-homebackground h-16 w-full flex items-center border-b-2 border-b-white  justify-between pl-16 pr-8">
        <button
          className="hamburger  flex flex-col  bg-black"
          onClick={handleSideBarToggle}
        >
          <span className="bar h-1 w-6 bg-white"></span>
          <span className="bar h-1 w-6 bg-white mt-1"></span>
          <span className="bar h-1 w-6 bg-white mt-1"></span>
        </button>
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`text-white p-2 w-40 rounded-md border-white shadow-sm shadow-white font-bold mix-blend-overlay hover:shadow-blue-200 ${
              isActive(item.link) ? "bg-fuchsia-600 " : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
