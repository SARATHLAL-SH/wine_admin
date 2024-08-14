import { configureStore } from "@reduxjs/toolkit";
import GetDailyShopReportReducer from "./Slices/dailyShopReportSlice";
import GetMonthlyShopReportReducer from "./Slices/monthlyShopReportSlice";
import GetYearlyShopReportReducer from "./Slices/yearlyshopReportSlice";
import GetDailyDeliveryReportReducer from "./Slices/dailyDeliveryBoyReportSlice";
import authReducer from "./Slices/authReducer";
import GetShopRequestReducer from "./Slices/shopRequestslice";

export const store = configureStore({
  reducer: {
    getDailyShopReport: GetDailyShopReportReducer,
    getMonthlyShopReport: GetMonthlyShopReportReducer,
    getYearlyShopReport: GetYearlyShopReportReducer,
    getDailyDeliveryReport: GetDailyDeliveryReportReducer,
    auth: authReducer,
    getShopRequest: GetShopRequestReducer,
  },
});
