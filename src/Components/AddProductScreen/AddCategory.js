import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { API } from '../../utils/apiUtils';
import { handleImageChange } from '../../Helpers/addProductScreen/handleImageChange';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess } from '../../Helpers/toaster';


const AddCategory = () => {
    
    const [categoryImage, setCategoryImage] = useState(null);
    const [categoryURL, setCategoryURL] = useState('');
    const [error,setError] = useState()
    const [categoryData,setCategoryData] = useState({
        category:"",
        description:"",
      });

     
     
      const addCategoryHandle = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const submitCategoryHandle = async () =>{
        if(categoryData.category && categoryData.description && categoryImage){
        try{
          const response = await axios.post(API+"/create/categories",{
            name: categoryData.category,
            description: categoryData.description,
            images: categoryURL,
            subcategoryType:["General"]
          }
            )
            if(response.data){
              console.log("category add",response.data)
              notifySuccess("Category Added Successfully")
              setCategoryData({
                category:"",
                description:"",
              });
              setCategoryImage(null);
            }
        }catch(err){
          console.log("error while adding category",err)
        }
        }
        else{
          console.log("please fill all the fields")
          notifyError("please fill all the fields")
        }
        }
  return (
    <div>
      <h1 className='mt-5 text-2xl  font-bold text-white opacity-25 '>ADD CATEGORY</h1>
            
            <div>
      
            <div className='flex flex-row mt-5 align-center justify-between'>
              <p className='mt-5 mr-5 font-bold text-white'>Category </p> 
              <input name='category' value={categoryData.category} onChange={addCategoryHandle} type='text' placeholder='Category' className=' border-b p-0   w-half bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-white font-bold' />
            </div>
      
            <div className='flex flex-row mt-5 align-center justify-between'>
              <p className='mt-5 mr-5 font-bold text-white'>Description </p> 
              <textarea name='description' value={categoryData.description} onChange={addCategoryHandle} placeholder='Describe Here' className=' border-b p-0   w-half bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-white font-bold' />
            </div>
      
            <div className='flex flex-row mt-5 align-center justify-between '>
              <p className='mt-5 mr-5 font-bold text-white'>Select Image</p> 
              <div className='justify-center align-between mb-10 flex flex-col' >
              <input name='uploadCategroy' type="file" onChange={(e)=>handleImageChange(e,setCategoryURL,setCategoryImage)} className=" p-0 mt-5 mb-5  w-52    text-white font-bold" />
              {categoryImage && (
                <>
                <button name='button' className='bg-red-600 text-white w-5 ' onClick={()=>setCategoryImage(null)} >X</button>
              <img
                src={categoryImage}
                alt="Selected"
                className="w-32 h-32 object-cover mb-5  border-2 border-gray-300"
              />
              
              </>
            )} 
            <div className='mt-5 '>
            <button name='button' className='bg-green-600 text-white hover:bg-green-400  p-2 ' onClick={submitCategoryHandle} >Add Categroy</button>
            <p className='text-red-600 font-bold align-center mt-3'>{error}</p>
            
            </div>
            </div>
            </div>
            </div>
    </div>
  )
}

export default AddCategory
