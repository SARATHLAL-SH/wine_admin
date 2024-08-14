import React, { useEffect, useState } from 'react'
import { useActionData } from 'react-router-dom'
import { fetchAllCustomer } from '../../Helpers/VerificationScreen/fetchAllCustomer'
import { dateConvertor } from '../../Helpers/dateConvertor'
import { API } from '../../utils/apiUtils'
import axios from 'axios';

const CustomerVerification = () => {
  const [userData,setUserData] = useState([])
  const [isChecked, setIsChecked] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('all');

  useEffect(()=>{
    fetchAllCustomer(setFilteredData,'all')
  },[])


  const handleFilter = (status) => {
    
    fetchAllCustomer(setFilteredData,status);
    setSelectedButton(status);
    
  
  };
  const getButtonClass = (status) => {
    return `w-28 bg-blue-500 ${selectedButton === status ? 'bg-blue-700' : 'hover:bg-blue-600'}`;
  };

  const handleCheckboxChange =async (id,addressId,isVerified) => {
    try {
      console.log(API+`/update/user/isVarified/${id}`)
      const response = await axios.put(API+`/update/user/isVarified/${addressId}`)
 if(response.data){

    setIsChecked((prevState)=>({
      ...prevState,
      [id]: !prevState[id],
    }));
    console.log("is checked id",isChecked[id])
    fetchAllCustomer(setFilteredData,isChecked[id] );
    setSelectedButton(isChecked[id]);
  };
    } catch (error) {
      console.error('Error updating status:', error);
    }

}
  


  console.log("userData",userData)
  return (
    <div className='flex flex-col w-full h-screen items-center my-4  justify-start   '>
    <div className='flex flex-row w-full items-center justify-around shadow-lg shadow-gray-800 pb-4 mb-4 '>
    <button  onClick={() => handleFilter('all')} className={getButtonClass('all')}>All</button>
    <button onClick={() => handleFilter(true)} className={getButtonClass(true)}>Verified</button>
    <button onClick={() => handleFilter(false)} className={getButtonClass(false)}>Pending</button>
    </div>
    <div className='flex flex-col w-full items-center justify-start overflow-y-auto mb-4  '>
   
     {filteredData?.map((user)=>(
      <div className='flex flex-col w-4/5 shadow-lg shadow-gray-800  p-4 font-bold   m-4 items-center '>
        

        <p> {dateConvertor(user.createdAt)}</p>
        <div className='flex flex-col w-full  items-start bg-purple-900 p-2 text-white shadow-lg shadow-gray-800 justify-around '>
         
         <p>Name: {user?.customerPermanentAddress?.username }</p>
         <p>Mobile Number: {user?.customerPermanentAddress?.mobileNumber }</p>
         <p>Email: {user?.customerPermanentAddress?.email }</p>
        
         </div>
         <div className='flex flex-col w-full items-start  bg-purple-800 p-2 text-white shadow-lg shadow-gray-800 justify-around'>
         
          <p>Address:{user?.localAddress?.ouseFlatBlockNo }</p>
          <p>{user?.localAddress?.apartmentRoadArea }</p>
          <p> {user?.localAddress?.placeName }</p>
          <p> {user?.localAddress?.landmark}</p>
          <p> {user?.localAddress?.pincode}</p>
          </div>
         
        <div className='flex flex-row w-full  items-start bg-purple-900 p-2  text-white shadow-lg shadow-gray-800 justify-around'>

        <a href={user?.customerPermanentAddress?.aadharFrontUrl} target="_blank" rel="noopener noreferrer">
          <img
        src={user?.customerPermanentAddress?.aadharFrontUrl}  
        alt="Selfie" className='w-full h-60 shadow-gray-800 '/>
        
        </a>

         <a href={user?.customerPermanentAddress?.aadharBackUrl} target="_blank" rel="noopener noreferrer">
          <img
        src={user?.customerPermanentAddress?.aadharBackUrl}  
        alt="Selfie" className='w-full h-60 shadow-gray-800 '/>
        </a>

        <a href={user?.customerPermanentAddress?.selfieUrl} target="_blank" rel="noopener noreferrer">
          <img
        src={user?.customerPermanentAddress?.selfieUrl}  
        alt="Selfie" className='w-full h-60 shadow-lg shadow-gray-800'/>
       </a>

         </div>
         <div className='flex flex-row w-full  items-start bg-purple-900 p-2  text-white shadow-lg shadow-gray-800 justify-around'>

         <label className={`px-4 text-white  `}>
         <input  className='mr-4'
          type="checkbox"
          checked={user?.customerPermanentAddress?.isVerified}
          onChange={()=>handleCheckboxChange(user._id,user?.customerPermanentAddress?._id,user?.customerPermanentAddress?.isVarified)}
        />
        {user?.customerPermanentAddress?.isVerified ? 'Verified' : 'Verify'}
      </label>
         </div>
          </div>
         
     ))}
    </div>
    </div>
  )
}

export default CustomerVerification