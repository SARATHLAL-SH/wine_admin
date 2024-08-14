import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { API } from '../../utils/apiUtils';
import { fetchCategories } from '../../Helpers/addProductScreen/fetchCategories';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess } from '../../Helpers/toaster';


const DeleteCategory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('Category');
    const [error,setError] = useState()
    const [categories,setCategories] = useState();
    const [categoryId,setCategoryId] = useState();


    const messageHandler = (msg) => {
        setError(msg);
        setTimeout(() => {
            setError(null);
        }, 3000);
      };
      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
      const handleCategoryChange = (category,id) => {
      
        setCategoryName(category);
        setCategoryId(id)
        setIsOpen(!isOpen);
        
      };
    const deleteCategoryHandle = async () =>{
      if(categoryId){
        try{
          const response = await axios.delete(API+"/categories/"+categoryId);
          if(response.data){
            console.log("category deleted",response.data)
            notifySuccess("Category Deleted Successfully")
            setCategories(categories.filter(category => category._id!== categoryId));
            setCategoryName("Category")
          }
        }catch(err){
          
          console.log("error while deleting category",err)
          notifyError("Error while deleting category")
        }}
        else{
          console.log("please select a category")
          notifyError("Please select a category")
        }
      }
      useEffect(() =>{
        fetchCategories(setCategories);
        
       },[categoryName, isOpen])
  return (
    <div>
         <div className='mt-5 text-2xl  font-bold text-white'  >Delete Categroy</div>
      <div className='relative flex flex-row mt-5 align-center justify-between'>
      <div className="relative inline-block">
        <button type='button' className=' drowpdown-button w-half  inline-flex justify-center w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'onClick={toggleDropdown}>{categoryName}<span className="caret ml-2">&#9660;</span></button>
        {isOpen ? (
      <div className="dropdown-menu absolute right-0 top-10 z-10 bg-white w-44 h-44 overflow-y-auto rounded shadow-md">
      {categories?.map((category, index) => (
        <div className='flex flex-col' onClick={() => {handleCategoryChange(category.name,category._id)}} key={index}>
      <a href='#' key={index} className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100">
        {category.name}
      </a>
      </div>
    ))}

  </div>
) : null}
</div>
<button name='button' className='bg-red-600 text-white hover:bg-red-400  p-2 ' onClick={deleteCategoryHandle}>Delete</button>
   
</div>
<p className='text-red-600 font-bold align-center mt-3'>{error}</p>

    </div>
  )
}

export default DeleteCategory