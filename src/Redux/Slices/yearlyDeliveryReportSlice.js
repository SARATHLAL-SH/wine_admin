import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/apiUtils';

export const fetchYearlyDeliveryReport = createAsyncThunk('fetchYearlyDeliveryReport', async ({selectedYear,selectedDeliveryBoyID}) => {
  console.log("API=======>",`${API}/get/yearly/delivery/boy/report/${selectedDeliveryBoyID}/${selectedYear}`)
  try {
    const response = await axios.get(`${API}/get/yearly/delivery/boy/report/${selectedDeliveryBoyID}/${selectedYear}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const GetYearlyMonthlyReport = createSlice({
    name: 'getYearlyMonthlyReport',
    initialState: { data: [], isLoader: false, isError: false },
    extraReducers: builder =>{
        builder.addCase(fetchYearlyDeliveryReport.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(fetchYearlyDeliveryReport.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(fetchYearlyDeliveryReport.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        });
    }
})

export default GetYearlyMonthlyReport.reducer;