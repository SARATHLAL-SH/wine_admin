import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/apiUtils';

export const fetchDailyDeliveryReport = createAsyncThunk('fetchDailyDeliveryReport', async ({startDate,selectedDeliveryBoyID}) => {
  console.log("API=======>",`${API}/get/daily/delivery/boy/report/${selectedDeliveryBoyID}/${startDate}`)
  // console.log("shopID=======>",selectedShopID)
  try {
    const response = await axios.get(`${API}/get/daily/delivery/boy/report/${selectedDeliveryBoyID}/${startDate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const GetDailyDeliveryReport = createSlice({
    name: 'getDailyDeliveryReport',
    initialState: { data: [], isLoader: false, isError: false },
    extraReducers: builder =>{
        builder.addCase(fetchDailyDeliveryReport.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(fetchDailyDeliveryReport.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(fetchDailyDeliveryReport.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        });
    }
})

export default GetDailyDeliveryReport.reducer;