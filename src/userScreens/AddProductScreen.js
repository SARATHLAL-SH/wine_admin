import React,{useState, useEffect} from 'react'
import axios  from 'axios';
import { API } from '../utils/apiUtils';
import { handleImageChange } from '../Helpers/addProductScreen/handleImageChange';
import { fetchCategories } from '../Helpers/addProductScreen/fetchCategories';

import 'react-toastify/dist/ReactToastify.css';
import AddCategory from '../Components/AddProductScreen/AddCategory';
import DeleteCategory from '../Components/AddProductScreen/DeleteCategory';
import AddSubCategory from '../Components/AddProductScreen/AddSubCategory';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { notifyError,notifySuccess } from '../Helpers/toaster';



const AddProductScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubOpen, setIsSubOpen] = useState(false);
    const [isMlOpen, setIsMlOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('Category');
    const [subName, setSubName] = useState('SubCategory');
    const [selectedImage, setSelectedImage] = useState(null);
    const [miligram, setMiligram] = useState('Miligram');
    const [imageURL, setImageURL] = useState('');
    const [error,setError] = useState()
    const [categories,setCategories] = useState();
    const [categoryId,setCategoryId] = useState();
    const [subcategoryData,setSubcategoryData] = useState()
    const [isOffer,setIsOffer] = useState(false);
    const [productData,setProductData] = useState({
      name:'',
      price:"",
      offer:"",
    })
    
     const handleCategoryChange = (category,id) => {
        setCategoryName(category);
        setCategoryId(id)
        setIsOpen(!isOpen);
        getSubCategories(id)
      };
       
       useEffect(() =>{
        fetchCategories(setCategories);
       },[categoryName, isOpen])
    
      const getSubCategories = async (id) =>{
        try{
          const response = await axios.get(API+`/get/subcategory/type/${id}`);
          if(response.data){
            console.log("subcategories",response.data.subcategoryType)
            setSubcategoryData(response?.data?.subcategoryType||[])
          }
        }catch(err){
          console.log("error while fetching categories",err.data.response.data);
        }
      }

      const miligrams =[{ml:30},{ml:90},{ml:180},{ml:330},{ml:360},{ml:375},{ml:650},{ml:750},{ml:1000}]

      const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIsMlOpen(false);
        setIsSubOpen(false);
      };
     
      const toggleSubDropdown = () => {
        setIsSubOpen(!isSubOpen);
        setIsMlOpen(false);
        setIsOpen(false);
      };

      const toggleMlDropdown = () => {
        setIsMlOpen(!isMlOpen);
        setIsSubOpen(false);
        setIsOpen(false);
      };
    
      const handleSubChange = (category) => {
        setSubName(category);
        setIsSubOpen(!isSubOpen);
      };

      const handleMlChange = (ml) => {
        setMiligram(ml);
        setIsMlOpen(!isMlOpen);
      };

      const inputChangeHandler = (e) => { 
        const {name,value} = e.target;
        setProductData((prevData)=>({
          ...prevData,
          [name]:value
        }))
      };
      const handleCheckboxChange = () => {
        setIsOffer(!isOffer);
        if(!isOffer){
          notifySuccess("Product has Offer! You can add offer Price")
        }
        else{
          notifyError("Offer Removed")
        }
      };

      const addProductHandler = async () => {
        console.log("productData=======>",productData,miligram,selectedImage,categoryName,subName)
        if(productData.name && productData.price  && miligram && selectedImage && categoryName && subName){
        
        const data = {
          name:productData.name,
          price:productData.price*1,
          offer:productData.offer *1,
          categoryId:categoryId,
          subCategoryType:subName,
          miligram:miligram,
          images:imageURL,
          wineShopId:"661597712a93792d53b32449",
          isOffer:isOffer,
        }  
        
        try{
          const response = await axios.post(API+'/create/wine/subcategories',data);
          if(response.data){
            console.log("product added successfully",response.data);
            notifySuccess("Product Added Successfully")
            setProductData({
              name:'',
              price:"",
              offer:"",
            });
            setSelectedImage(null);
            setCategoryName('Category');
            setSubName('SubCategory');
            setMiligram('Miligram');
            setImageURL('');
            
          }
        }catch(err){
          console.log("error while adding product",err);
          notifyError(err?.response?.data?.message)
        }
      }
      else{
        notifyError("Please fill all the fields")
      }
      };

  
  return (
    <div className='flex flex-col justify-between align-center h-screen bg-radiant-homebackground pt-20 p-5 md:flex-row '>
      <div  className=' bg-radiant-homebackground w-full ml-0 mb-5  p-4 h-full  overflow-y-auto hide-scrollbar shadow-lg  shadow-gray-800 bg-blend-overlay md:ml-0 md:mb-5 md:w-full '>
      <h1  className='text-2xl font-bold text-gray-800 text-white opacity-25'>CREATE PRODUCT</h1>
    <div className='flex flex-row mt-10 align-center justify-between '>
      <p className='mt-5 mr-5  font-bold text-white'>Product Name</p> 
      <input type='text' placeholder='Product Name' name="name" value={productData.name} onChange={inputChangeHandler}  className=' border-b p-0   
        w-half bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 
        text-white font-bold' />
    </div>
      
    <div className='relative flex flex-row mt-5 align-center justify-between'>
        <p className='mt-5 mr-5 font-bold  text-white'>Product miligrams</p> 
        <div className="relative inline-block">
        <button type='button'  className=' drowpdown-button w-half  inline-flex justify-center
         w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium 
         text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-500' onClick={toggleMlDropdown}>{miligram} ML<span className="caret ml-2">&#9660;</span>
         </button>

      {isMlOpen ? (
    <div className="dropdown-menu h-44 overflow-y-auto absolute z-20  right-0 top-10  bg-white w-44  rounded shadow-md">
        {miligrams?.map((miligram, index) => (
        <div className='flex flex-col' onClick={() => {handleMlChange(miligram.ml) }} key={index}>
        <li key={index} value={miligram.ml} className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100">
        {miligram.ml} ML
      </li>
      </div>
        ))}
      </div>
      ) : null}
      </div>
      
    </div>
      
    <div className='flex flex-row mt-5 align-center justify-between'>
        <p className='mt-5 mr-5 font-bold text-white'>Product Price</p> 
        <input type='number'  placeholder='Price' name="price" value={productData.price} onChange={inputChangeHandler}  className=' border-b p-0   w-half bg-transparent focus:outline-none focus:border-b-2  focus:border-b-red-600 text-white font-bold' />
    </div>
    <div className='flex flex-row mt-5 align-center justify-between'>
        <p className='mt-5 mr-5 font-bold text-white'>Offer Price</p> 
        <input type="checkbox" checked={isOffer} onChange={handleCheckboxChange} />
        <input type='number' max="6"  name="offer" disabled={!isOffer} value={productData.offer} onChange={inputChangeHandler} placeholder='If Any Offer' className=' border-b p-0   w-half bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-white font-bold' />
    </div>
    <div className='relative flex flex-row mt-5 align-center justify-between'>
        <p className='mt-5 mr-5 font-bold text-white'>Category Name</p> 
        <div className="relative inline-block">
        <button type='button' className=' drowpdown-button w-half  inline-flex justify-center w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'onClick={toggleDropdown}>{categoryName}<span className="caret ml-2">&#9660;</span></button>
        {isOpen ? (
    <div className="dropdown-menu   absolute right-0 top-10 bg-white w-44 h-44 overflow-y-auto rounded shadow-md z-10">
    {categories ? categories?.map((category, index) => (
    <div className='flex flex-col  ' onClick={() => {handleCategoryChange(category.name,category._id)}} key={index}>
      <li key={index} className="block px-4 py-2  text-sm text-gray-700  hover:bg-gray-100   ">
        {category.name}
      </li>
    </div>
    )):
    <div className='flex flex-col'>
      <li  className="block px-4 py-2  text-sm text-gray-700  hover:bg-gray-100 ">
       Loading...
      </li>
    </div>}
    </div>
    ) : null}
    </div>
    </div>

 <div className='relative flex flex-row mt-5 align-center justify-between'>
        <p className='mt-5 mr-5 font-bold text-white'>Sub category Name</p> 
        <div className="relative  inline-block">
        <button type='button' className=' drowpdown-button w-half  inline-flex justify-center w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'onClick={toggleSubDropdown}>{subName}<span className="caret ml-2">&#9660;</span></button>
        {isSubOpen ? (
  <div className="dropdown-menu h-44 overflow-y-auto absolute right-0 top-10  z-0 bg-white w-44  rounded shadow-md">
  {subcategoryData?
    subcategoryData?.map((category, index) => (
        <div className='flex flex-col' onClick={() => {handleSubChange(category)}} key={index}>
      <a href='#' key={index} className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100">
        {category}
      </a>
      </div>
    )):
      <div className='flex flex-col'>
      <a href='#' className="block px-4 py-2 text-sm text-red-700  hover:bg-gray-100">
        No Subcategory 
      </a>
      </div>
    }
  </div>
) : null}
 </div>
   </div>
        <div className='flex flex-row mt-5 align-center justify-between '>
        <p className='mt-5 mr-5 font-bold text-white'>Select Image</p> 
        <div className='justify-center align-between mb-10 flex flex-col' >
        <input type="file" onChange={(e)=>handleImageChange(e,setImageURL,setSelectedImage)} className=" p-0 mt-5 mb-5  w-52    text-white font-bold" />
        {selectedImage && (
          <>
          <button name='button' className='bg-red-600 text-white w-5 ' onClick={()=>setSelectedImage(null)} >X</button>
        <img
          src={selectedImage}
          alt="Selected"
          className="w-32 h-32 object-cover mb-5  shadow-lg  shadow-gray-800"
        />
       
        </>
      )}
      <div className='mt-5 '>
      <button name='button' className='bg-green-600 text-white hover:bg-green-400  p-2 ' onClick={addProductHandler} >Add Product</button>
      <p className='text-red-600 font-bold align-center mt-3'>{error}</p>
        
      </div> 
      </div>
      </div>  
      </div>
   
    
    <div className='flex flex-col ml-0 w-1/2 w-full overflow-y-auto hide-scrollbar shadow-lg  shadow-gray-800 wrap-wrap h-full md:ml-8 md:mb-5 md:w-full '>
    <div className='ml-0 bg-radiant-homebackground   wrap-wrap  p-2 h-3/2'>
    <div className='mt-5 justify-between  flex flex-row mb-0 flex-wrap  pr-2 '>
    <NavLink to ="add-category"  className={({ isActive }) =>
            `bg-gray-300 p-2 hover:bg-radiant-maroon w-32 mb-2 text-xs font-bold  ml-2 ${isActive ? 'bg-radiant-maroon' : ''}`
          }> Add Category</NavLink>
    <NavLink to ="add-subcategory"  className={({ isActive }) =>
            `bg-gray-300 p-2 hover:bg-blue-500 mb-2 w-32 ml-2 text-xs font-bold ${isActive ? 'bg-radiant-maroon' : ''}`
          } > Add SubCategory</NavLink>
    <NavLink to="delete-category"  className={({ isActive }) =>
            `bg-gray-300 p-2 hover:bg-blue-500 mb-2 w-32 mr-2 text-xs font-bold ml-2 ${isActive ? 'bg-radiant-maroon' : ''}`
          }> Delete Category</NavLink>
    
    </div>
    <div className='flex flex-col bg-radiant-homebackground shadow-lg  shadow-gray-800 mt-5 w-full  p-3'>
       <Routes>
          <Route path="add-category" element={<AddCategory/>} />
          <Route path="add-subcategory" element={<AddSubCategory/>} />
          <Route path="delete-category" element={<DeleteCategory/>} />
          </Routes>
   </div>
    </div>
    </div> 
    </div>
    
  )
}

export default AddProductScreen
