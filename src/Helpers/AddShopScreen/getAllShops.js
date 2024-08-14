import axios from 'axios';
import { API } from '../../utils/apiUtils';

export const getAllShops = async (setAllShops) => {
  try {
    const response = await axios.get(API + '/get-all-shop');
    if (response.data) {
      setAllShops(response.data )  
      console.log("shops=>",response.data);
      return response.data;

    }
  } catch (error) {
    console.log(error);
  }
};