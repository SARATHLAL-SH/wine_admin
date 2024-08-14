import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { API } from '../../utils/apiUtils';
import { fetchCategories } from '../../Helpers/addProductScreen/fetchCategories';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess } from '../../Helpers/toaster';

const AddSubCategory = () => {
    const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
    const [subcategoryName, setSubAddCategoryName] = useState('Category');
    const [error,setError] = useState()
    const [categories,setCategories] = useState();
    const [categoryId,setCategoryId] = useState();
    const [subcategoryText,setSubcategoryText] = useState()

   

    const toggleAddSubDropdown = () => {
        setIsSubCategoryOpen(!isSubCategoryOpen);
      };

      const handleSubAddCategoryChange = (category,id) => {
      
        setSubAddCategoryName(category);
        setCategoryId(id)
        setIsSubCategoryOpen(!isSubCategoryOpen);
      };

      const submitSubCategoryHandle = async () =>{
        if(subcategoryName && subcategoryText ){
          console.log("subcategoryText=>",subcategoryText, categoryId)
        try{
          const response = await axios.put(API+`/update/subcategoriey/type/${categoryId}`,{subcategoryType:[subcategoryText]})
            
            if(response.data){
              console.log("category add",response.data)
              notifySuccess("Sub Category Added Successfully")
              setSubcategoryText("")
              setSubAddCategoryName("Category")
            }
        }catch(err){
          console.log("error while adding category",err)
        }
        }
        else{
          console.log("please fill all the fields")
          notifyError("SELECT A CATEGORY AND FILL SUBCATEGORY NAME")
        }
        }
        useEffect(() =>{
            fetchCategories(setCategories);
           },[isSubCategoryOpen])
  return (
    <div><div className='mt-5 text-2xl  font-bold text-white'  >Add Sub Category</div>
    <div className='relative flex flex-row mt-5 align-center justify-between'>
      <p className='mt-5 mr-5 font-bold text-white'>Select Categroy </p> 
      <div className="relative inline-block">
      <button type='button' className=' drowpdown-button w-half  inline-flex justify-center w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'onClick={toggleAddSubDropdown}>{subcategoryName}<span className="caret ml-2">&#9660;</span></button>
      {isSubCategoryOpen ? (
<div className="dropdown-menu absolute right-0 top-10 z-10 bg-white w-44 h-44 overflow-y-auto rounded shadow-md">
  {categories?.map((category, index) => (
      <div className='flex flex-col' onClick={() => {handleSubAddCategoryChange(category.name,category._id)}} key={index}>
    <a href='#' key={index} className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100">
      {category.name}
    </a>
    </div>
  ))}
</div>
) : null}
</div>
</div>

<div className='flex flex-row mt-5 align-center justify-between'>
      <p className='mt-5 mr-5 font-bold text-white'>Sub Category Name</p> 
      <input type='text' placeholder='Subcategroy' value={subcategoryText} onChange={(e)=>setSubcategoryText(e.target.value)}  className=' border-b p-0   w-half bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-white font-bold' />
    </div>
    <div className='mt-5 '>
    <button name='button' className='bg-green-600 text-white hover:bg-green-400  p-2 ' onClick={submitSubCategoryHandle} >Add Subcategroy</button>
    <p className='text-red-600 font-bold align-center mt-3'>{error}</p>
   
    </div></div>
  )
}

export default AddSubCategory