import axios from 'axios';
import { API } from '../../utils/apiUtils';

export const getAllDeliveryBoy = async (setDeliveryBoyData) => {
    try {
      const response = await axios.get(`${API}/get/register/delivery/boy`);
      setDeliveryBoyData(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };