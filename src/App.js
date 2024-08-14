import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Route, Routes } from "react-router-dom";
import AddProductScreen from "./userScreens/AddProductScreen";
import ViewProducts from "./userScreens/ViewProducts";
import AddShopScreen from "./userScreens/AddShopScreen";
import AddDeliveryBoy from "./userScreens/AddDeliveryBoy";
import { ToastContainer, toast } from "react-toastify";
import ReportScreen from "./userScreens/ReportScreen";
import OrderDetails from "./userScreens/OrderDetails";
import LoginScreen from "./AthScreens/LoginScreen";
import ProtectedRoute from "./Helpers/LoginScreen/ProtectedRoute";
import { useSelector } from "react-redux";
import Navigation from "./Navigation/Navigation";
import VerificationScreen from "./userScreens/VerificationScreen";
import Logout from "./userScreens/Logout";
import About from "./userScreens/About";
import ShopRequests from "./userScreens/ShopRequests";
const dotenv = require("dotenv");
dotenv.config();

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        <Route path="/" element={<ProtectedRoute element={<Navigation />} />}>
          <Route
            path="/Home/*"
            element={
              <ProtectedRoute
                element={<AddProductScreen />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/ViewProducts"
            element={
              <ProtectedRoute
                element={<ViewProducts />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/AddShops"
            element={
              <ProtectedRoute
                element={<AddShopScreen />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/AddDeliveryBoy"
            element={
              <ProtectedRoute
                element={<AddDeliveryBoy />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/Reports"
            element={
              <ProtectedRoute
                element={<ReportScreen />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/OrderDetails"
            element={
              <ProtectedRoute
                element={<OrderDetails />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/Verification"
            element={
              <ProtectedRoute
                element={<VerificationScreen />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/shopRequests"
            element={
              <ProtectedRoute
                element={<ShopRequests />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/About"
            element={
              <ProtectedRoute
                element={<About />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/Signout"
            element={
              <ProtectedRoute
                element={<Logout />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Route>
      </Routes>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
