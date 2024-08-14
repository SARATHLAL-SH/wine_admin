import axios from "axios";
import { API } from "../../utils/apiUtils";


export const getDeliveryBoy = async(setDeliveryBoy) =>{
    try{
    const response = await axios.get(API+`/get/register/delivery/boy`);
    if(response.data){
    setDeliveryBoy (response?.data);
}
    }catch(error){
      console.log("errorn in  deliveryBoyHandler", error)
    }
  } 