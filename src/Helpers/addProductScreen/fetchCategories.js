import axios from 'axios';
import { API } from '../../utils/apiUtils';
export const fetchCategories = async (setCategories) =>{
    try{
      const response = await axios.get(API+"/get-all-categories");
      if(response.data){
        setCategories(response.data);
        
       
      }
    }catch(err){
      console.log("error while fetching categories",err);
    }
  }