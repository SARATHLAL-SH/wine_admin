import React, { useEffect,useState } from 'react'
import { getAllShops } from '../../Helpers/AddShopScreen/getAllShops';
import { notifyError,notifySuccess } from '../../Helpers/toaster';
import axios from 'axios';
import {API} from '../../utils/apiUtils';


const DeleteShop = () => {
    const [allShops,setAllShops] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [shopId, setShopId] = useState();
    const [shopName, setShopName] = useState('Select Shop');

    useEffect(()=>{
        getAllShops(setAllShops);
    },[isOpen])

    const handleShopChange = (shopName,id) => {
        setShopName(shopName);
        setShopId(id)
        setIsOpen(!isOpen);
      };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
       
      };
    const deleteWineShopHandler = async ()=>{
      if(shopId || shopName === 'Select Shop'){
       try {
        const response = await axios.delete(API + '/delete/wineshop/'+shopId);
        if (response.data) {
          notifySuccess("Shop Deleted Successfully")
          setShopName('Select Shop');
        }
       } catch (error) {
        notifyError("Shop Not Available")
       }
      }
      else{
      notifyError("Please Select Shop")
      }
    }
  return (
    <div>
<div className='relative flex flex-row mt-5 align-center justify-between'>
        <p className='mt-5 mr-5 font-bold  text-white'>SELECT SHOP</p> 
        <div className="relative inline-block">
        <button type='button'  className=' drowpdown-button w-half  inline-flex justify-center
         w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium 
         text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-500' onClick={toggleDropdown}>{shopName} <span className="caret ml-2">&#9660;</span>
         </button>

      {isOpen ? (
    <div className="dropdown-menu h-44 overflow-y-auto absolute right-0 top-10  bg-white w-44  rounded shadow-md">
        {allShops?.map((shop, index) => (
        <div className='flex flex-col' onClick={() => {handleShopChange(shop.ShopName,shop._id) }} key={index}>
        <li key={index} value={shop.ShopName} className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100">
        {shop.ShopName} 
      </li>
      </div>
        ))}
      </div>
      
      ) : null}
      </div>
      <button name='button' className='bg-red-600 text-white hover:bg-red-400  p-2 ' onClick={deleteWineShopHandler}>Delete</button>

    </div>
    </div>
  )
}

export default DeleteShop