import React,{useEffect,useState} from 'react'
import { getDeliveryBoy } from '../../Helpers/VerificationScreen/getDeliveryBoy';
import { dateConvertor } from '../../Helpers/dateConvertor';

const DeliveryBoyVerification = () => {
    const [deliveryBoy, setDeliveryBoy] = useState([]);

    useEffect(() => {
       getDeliveryBoy(setDeliveryBoy)     
        
           },[])     
  return (
    <div className='flex flex-col items-center h-screen  p-4 justify-start overflow-y-scroll'>
    <div className='flex flex-col items-center h-3/5 w-full  p-4 justify-start  '>
        {deliveryBoy?.map((item, index) => (
        <div key={index} className='flex flex-col  w-full p-4 font-bold shadow-lg shadow-gray-800   items-center  '>
      
        <img
        src={item.selfieImages}  
        alt="Selfie" className='w-44 h-44 rounded-full text-center p-2 shadow-lg shadow-gray-800 mb-2  '/>
       
        <p className='text-white'> {dateConvertor(item.createdAt)}</p>
         <div className='flex flex-row w-full items-center bg-gray-400 p-2 mt-2 border-2 border-gray-600  text-white shadow-md justify-around'>
          <p className="">{item.name.toUpperCase()}</p>
          <p>Age: {item.age}</p>
          </div>
         <div className='flex flex-row w-full items-center mt-4 bg-gray-200 border-2 border-gray-600  justify-around'>
          <div>
          <p className=''>Mobile Number</p>
          <p>{item.mobileNumber}</p>
          </div>
          <div >
         <p>Adhaar Card Number</p>
          <p>{item.aadhaarCardNumber}</p>
          </div>
          </div>

          <div className='items-center shadow-md p-2 mt-4 w-full shadow-lg shadow-gray-800 justify-center'>
          <p className="text-center text-white">Adhaar Image</p>
          <img
        src={item.aadharImage}  
        alt="Selfie" className='w-full h-72 '/>
        </div>
         <div className='items-center mt-4 w-full shadow-md p-2 justify-center'>
          <p className="text-center text-white">Selfie Image</p>
          <img
        src={item.selfieImages}  
        alt="Selfie" className='w-full h-80 '/>
        </div>
         
        <div className='mt-4 bg-gray-200 w-full p-2'>
         <p>Address:</p>
         <p>{item.address}</p>
         </div>
         
        
           <p>Shop Name:  {item?.isAdmin==="true" ? 'Admin' : item?.shopId?.ShopName}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default DeliveryBoyVerification