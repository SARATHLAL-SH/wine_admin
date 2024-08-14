import axios from 'axios';
import { API } from '../../utils/apiUtils';
import { notifyError,notifySuccess } from '../../Helpers/toaster';

export const sendOTP = async (mobileNumber) => {
  try {
    const response = await axios.post(  API + `/send-otp`,{mobileNumber})
            if(response.data){
              console.log('otp sent', response.data)
              notifySuccess("OTP sent successfully");
            }
            else{
              console.log('otp not sent', response.data)
              notifyError("OTP not sent");
            }
  } catch (error) {
    console.log(error);
    notifyError(error?.response?.data?.message);
  }
};