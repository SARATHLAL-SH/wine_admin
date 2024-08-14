import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/apiUtils";

export const fetchShopRequests = createAsyncThunk(
  "fetchShopRequests",
  async () => {
    try {
      const response = await axios.get(`${API}/get-correction-wine-categpry`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const GetShopRequestSlice = createSlice({
  name: "getShopRequest",
  initialState: { data: [], isLoader: false, isError: false },
  extraReducers: (builder) => {
    builder.addCase(fetchShopRequests.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchShopRequests.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchShopRequests.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default GetShopRequestSlice.reducer;
