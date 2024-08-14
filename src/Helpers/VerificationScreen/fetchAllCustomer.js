import axios from "axios";
import { API } from "../../utils/apiUtils";


export const fetchAllCustomer = async(setUserData,filter) =>{
    try{
    const response = await axios.get(API+`/get/all/customer`);
 
    if(response.data){
      console.log("response",filter)
if(filter === 'all')
    setUserData (response?.data?.data);  
console.log("response if all",response?.data?.data?.filter(customer => customer?.customerPermanentAddress?.isVerified===true))
}
 if(filter === true){
  setUserData (response?.data?.data?.filter(customer => customer?.customerPermanentAddress?.isVerified===true))
  console.log("response if true",response?.data?.data?.filter(customer => customer?.customerPermanentAddress?.isVerified===true))
}
 if(filter === false){
  setUserData (response?.data?.data?.filter(customer => customer?.customerPermanentAddress?.isVerified !== true));
  console.log("response if false",response?.data?.data?.filter(customer => customer?.customerPermanentAddress?.isVerified===false))
}
    }catch(error){
      console.log("errorn in  deliveryBoyHandler", error)
    }
  } 