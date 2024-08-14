import axios from "axios";
import { API } from "../../utils/apiUtils";
import { notifyError, notifySuccess } from "../../Helpers/toaster";


export const verifyOTP = async (otp="0000", mobileNumber=0,setIsverify) => {
    try {
      console.log('otp', otp);
      const otpResponce = await axios.post(API + '/verify-otp', {
        otp,
        mobileNumber,
      });
      
      if (otpResponce.data) { 
       console.log('otpResponce', otpResponce.data);
       notifySuccess("OTP verified successfully");
       setIsverify(true);
      } else {
       console.log('OTP not valid');
       notifyError('OTP not valid');
      } 
    } catch (error) {
      console.log('error', error);
      notifyError("verification Failed");
      
    }
  };