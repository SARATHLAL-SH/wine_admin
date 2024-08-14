import axios from 'axios';
import { API } from '../utils/apiUtils';

export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API}/search/order/${orderId}`);
    if (response.status === 200) {
      return response?.data?.data;
    } else {
     return [{}]
    }
   
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};