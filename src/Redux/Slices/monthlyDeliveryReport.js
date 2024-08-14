import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/apiUtils';

export const fetchMonthlyDeliveryReport = createAsyncThunk('fetchMonthlyDeliveryReport', async ({selectedMonth,selectedDeliveryBoyID}) => {
  console.log("API=======>",`${API}/get/monthly/delivery/boy/report/${selectedDeliveryBoyID}/${selectedMonth}/2024`)
  try {
    const response = await axios.get(`${API}/get/monthly/delivery/boy/report/${selectedDeliveryBoyID}/${selectedMonth}/2024`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const GetMonthlyDeliveryReport = createSlice({
    name: 'getMonthlyDeliveryReport',
    initialState: { data: [], isLoader: false, isError: false },
    extraReducers: builder =>{
        builder.addCase(fetchMonthlyDeliveryReport.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(fetchMonthlyDeliveryReport.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(fetchMonthlyDeliveryReport.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        });
    }
})

export default GetMonthlyDeliveryReport.reducer;