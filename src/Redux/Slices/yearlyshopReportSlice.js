import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/apiUtils';

export const fetchYearlyShopReport = createAsyncThunk('fetchYearlyShopReport', async ({selectedYear,selectedShopID}) => {
  console.log("API=======>",`${API}/get/yearly/deliverd/report/${selectedShopID}/${selectedYear}`)
  try {
    const response = await axios.get(`${API}/get/yearly/deliverd/report/${selectedShopID}/${selectedYear}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const GetYearlyShopReport = createSlice({
    name: 'getYearlyShopReport',
    initialState: { data: [], isLoader: false, isError: false },
    extraReducers: builder =>{
        builder.addCase(fetchYearlyShopReport.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(fetchYearlyShopReport.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(fetchYearlyShopReport.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        });
    }
})

export default GetYearlyShopReport.reducer;