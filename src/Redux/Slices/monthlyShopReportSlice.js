import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/apiUtils';

export const fetchMonthlyShopReport = createAsyncThunk('fetchMonthlyShopReport', async ({selectedMonth,selectedShopID}) => {
  console.log("API=======>",`${API}/get/monthaly/deliverd/report/${selectedShopID}/${selectedMonth}/2024`)
  try {
    const response = await axios.get(`${API}/get/monthaly/deliverd/report/${selectedShopID}/${selectedMonth}/2024`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const GetMonthlyShopReport = createSlice({
    name: 'getMonthlyShopReport',
    initialState: { data: [], isLoader: false, isError: false },
    extraReducers: builder =>{
        builder.addCase(fetchMonthlyShopReport.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(fetchMonthlyShopReport.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(fetchMonthlyShopReport.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        });
    }
})

export default GetMonthlyShopReport.reducer;