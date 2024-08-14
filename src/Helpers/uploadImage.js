import axios from 'axios';
import { API } from '../utils/apiUtils';

export const handleImagePost = async (selectedFile,setUploading,setImageURL) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', selectedFile); 
  
      const response = await axios.post(API+"/images", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = response.data;
      setImageURL(Object.values(data).join());
      const imageKey = Object.values(data).join();
      console.log(response,'response')
      console.log(data,'data')
      return imageKey;
    } catch (err) {
      console.log("error while uploading Image",err);
    } finally {
      setUploading(false);
    }
  };
 