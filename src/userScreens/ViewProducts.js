import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API } from '../utils/apiUtils';
import { notifyError,notifySuccess } from '../Helpers/toaster';

const ViewProducts = () => {
    const [allProducts,setAllProducts] = useState()
    const [search,setSearch] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);


    const filterProducts = allProducts?.filter(product => product?.name?.toLowerCase().startsWith(search.toLowerCase()))
    const displayProducts = filterProducts ? filterProducts : allProducts
    
    const handleDelete = (id,name) => {
        setItemIdToDelete(id);
        setItemToDelete(name);
        setShowModal(!showModal);
      };
    
      const handleConfirmDelete = () => {
        if(itemIdToDelete){
        axios.delete(`${API}/wine-subcategories/${itemIdToDelete}`)
       .then(res => {
            console.log(res);
            notifySuccess(`${itemToDelete} deleted successfully`);
            setItemIdToDelete(null);
            setShowModal(false);
            getAllProducts();
        })
       .catch(err => {
            console.log(err);
            notifyError("Error occured while deleting item");
            setItemIdToDelete(null);
            setShowModal(false);
        })
        }
        console.log('Deleting item:', itemIdToDelete);
        setItemIdToDelete(null);
        setShowModal(false);
      };
    
      const handleCancelDelete = () => {
        setItemIdToDelete(null);
        setShowModal(false);
      };
    const getAllProducts = async () => {
        try{
            const response = await axios.get(`${API}/get-all-wine-subcategories`);
            setAllProducts(response.data);
            console.log("products=>",response.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllProducts();
    },[])

   
  

  return (
    <div className='h-screen bg-radiant-homebackground pt-20 justify-center  items-center'>
    <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)} onClick={()=>{setShowModal(false)}} placeholder='Search Product' className='bg-gray-100 border-2 pl-2 mb-2 border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 ml-2 mb-4 mt-3 focus:ring-opacity-50  w-1/4 md:w-1/3 md:ml-52'/>
    {showModal && (
        <div className="modal bg-white w-2/3 h-1/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center shadow-lg  shadow-gray-800 items-center b-2 border-red-600 z-50 md:w-1/4 ">
          <div className="modal-content mx-4">
            <p className='text-red-600 text-sm font-bold p-2'>Are you sure you want to delete this item {itemToDelete}?</p>
            <div className='flex justify-around items-center'>
            <button className='bg-red-600 text-white font-bold px-2' onClick={handleConfirmDelete}>Confirm</button>
            <button className='bg-black text-white font-bold px-3' onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    <div className=' h-3/4  ml-0 pt-4 flex shadow-lg  shadow-gray-800  flex-col items-center justify-center hide-scrollbar overflow-auto  md:mx-5 px-3 md:items-center md:px-0 '>
    
    {
        displayProducts?.map((product, index) => (
        <div key={index} className='flex flex-row items-center bg-radiant-homebackground    w-full  justify-start md:w-2/3 '> 
          <div className="text-black flex justify-between items-center w-full bg-gray-100 bg-blend-overlay  over-flow-auto flex-row p-1  mb-2 font-bold">
            <div className='flex flex-row items-center w-2/6 justify-between '>
            <h1 className='text-red-400'>{index+1}</h1>
            <h1 className=' text-sm md:w-52 md:text-l'>{product?.name}</h1>
            </div>
            <p>{product.miligram} Ml</p>
            <div className='flex flex-row items-center  justify-between w-48'>
            <p >Rs {product?.price}</p>
            {product.isOffer &&
            <p className='text-green-500'> Offer Rs {product?.offer || ''}</p>}
            
            </div>
           
           
            <button type='button' onClick={()=>handleDelete(product._id,product.name)} className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete</button>
          </div>
        </div>
      ))
    }
  </div>
  </div>
  )
}

export default ViewProducts
