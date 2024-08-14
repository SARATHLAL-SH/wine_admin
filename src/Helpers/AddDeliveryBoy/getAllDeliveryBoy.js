import axios from "axios";
import { API } from "../../utils/apiUtils";

export const getAllDeliveryBoy = async()=>{
    try{
        const response = await axios.get(`${API}//get/register/delivery/boy`);
        return response.data;
        console.log(response.data);
    }catch(error){
        console.log(error);
    }
}