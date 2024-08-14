import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/apiUtils';

export const fetchDailyReport = createAsyncThunk('fetchDailyReport', async ({startDate,selectedShopID}) => {
  console.log("API=======>",`${API}/get/daily/deliverd/report/${selectedShopID}/${startDate}`)
  console.log("shopID=======>",selectedShopID)
  try {
    const response = await axios.get(`${API}/get/daily/deliverd/report/${selectedShopID}/${startDate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const GetDailyShopReport = createSlice({
    name: 'getDailyShopReport',
    initialState: { data: [], isLoader: false, isError: false },
    extraReducers: builder =>{
        builder.addCase(fetchDailyReport.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(fetchDailyReport.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(fetchDailyReport.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        });
    }
})

export default GetDailyShopReport.reducer;