import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { handleImageChange } from '../Helpers/addProductScreen/handleImageChange'
import { sendOTP } from '../Components/AddProductScreen/sendOtp'
import { notifyError,notifySuccess } from '../Helpers/toaster'
import { verifyOTP } from '../Helpers/addProductScreen/verifyOtp'
import { getAllDeliveryBoy } from '../Helpers/ReportScreen/getAllDeliveryBoy'
import axios from 'axios';
import { API } from '../utils/apiUtils'

function AddDeliveryBoy() {
    const [adhaarURL, setAdhaarURL,] = useState()
    const [selectedAdhaarImage,setSelectedAdhaarImage] = useState()
    const [selectedPhoto, setSelectedPhoto] = useState()
    const [photoURL, setPhotoURL] = useState()
    const [isSendOTP,setIsSendOTP] = useState(false);
    const [isMobileNumber,setIsMobileNumber] = useState(false);
    const [isVerify,setIsverify] = useState(false);
    const [allDeliveryBoy,setAllDeliveryBoy] = useState();
    const [isMlOpen, setIsDeliveryOpen] = useState(false);
    const [deliveryMan, setdeliveryMan] = useState('Select DeliveryBoy');
    const [boyId,setBoyId] = useState();
    const [showModal, setShowModal] = useState(false);
    const [deliveryBoyData,setDeliveryBoyData] = useState({
      name:"",
      age:"",
      mobileNumber:"",
      otp:"",
      address:"",
      adhaarNumber:"",
    });

const handleChannge = (e) =>{
  const {name,value} = e.target;
    setDeliveryBoyData((prevData)=>({
     ...prevData,
      [name]:value
    }))
  }
  useEffect(() =>{
    getAllDeliveryBoy(setAllDeliveryBoy)
  },[allDeliveryBoy,isMlOpen] )

  const verifyOTPHandler =()=>{
    console.log("testt")
    if(deliveryBoyData.otp.length===4){
      verifyOTP(deliveryBoyData.otp,deliveryBoyData.mobileNumber,setIsverify);
    }else{
      notifyError("Please enter a valid OTP")
    }
  }
  const mobileNumberhandleChannge = (e) =>{
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 10) {
        setDeliveryBoyData({
            ...deliveryBoyData,
            mobileNumber: value
        }); 
    }
    if(value.length === 10){
      setIsMobileNumber(true);
    }else{
      setIsMobileNumber(false);
    }
   }
   const toggleDelverBoyDropdown = () => {
    setIsDeliveryOpen(!isMlOpen);
   
  };
  const handleDelBoyChange = (name,id) => {
    setdeliveryMan(name);
    setBoyId(id);
    setIsDeliveryOpen(!isMlOpen);
  };

    const sendOTPHandler =  () => {
      if(deliveryBoyData.mobileNumber.length===10){
        sendOTP(deliveryBoyData.mobileNumber);
        setIsSendOTP(true);
      }else{
        notifyError("Please enter a valid mobile number")
        setIsSendOTP(false);
      }
    }
    const handleConfirmDelete = async () => {
      if(boyId ){
        try {
         const response = await axios.delete(API + '/delete/develeryboy/details/'+boyId);
         if (response.data) {
           notifySuccess(`${deliveryMan} Data Deleted Successfully`)
           setdeliveryMan('Select Delivery Boy');
           setBoyId(null);
           setShowModal(false);
         }
        } catch (error) {
         notifyError("Error deleting Deliveryy Boy")
        }
       }
       else{
       notifyError("Please Select Delivery Boy")
       }
      
    };
  
    const handleCancelDelete = () => {
      setBoyId(null);
      setShowModal(false);
    };
    const registerHandler = async() =>{
      
      if(!deliveryBoyData.name && !deliveryBoyData.age && !deliveryBoyData.address && !deliveryBoyData.adhaarNumber && !deliveryBoyData.mobileNumber.length===10 ){
        notifyError("Please fill all the fields")
      }
      else if(!isVerify){
        notifyError("Please verify your mobile number")
      }
      
      else{
        const data = {
          name:deliveryBoyData.name,
          age:deliveryBoyData.age,
          mobileNumber:deliveryBoyData.mobileNumber,
          address:deliveryBoyData.address,
          aadhaarCardNumber:deliveryBoyData.adhaarNumber,
          aadharImage:adhaarURL,
          selfieImages:photoURL,
          isAdmin:true
        }
        try{
          const response = await axios.post(API+'/register/delivery/boy',data);
          if(response.data){
            notifySuccess("Delivery Boy created successfully");
            setDeliveryBoyData({
              name:"",
              age:"",
              mobileNumber:"",
              otp:"",
              address:"",
              adhaarNumber:"",
            });
            setIsSendOTP(false);
            setSelectedAdhaarImage(null);
            setSelectedPhoto(null);
            setPhotoURL('');
            setAdhaarURL('');
            isVerify(false);
          }
        }catch(error){
          console.log(error);
          notifyError(error?.response?.data?.message)
        } 
      }   
      }
      const deleteWineShopHandler = async ()=>{
        setShowModal(!showModal);
       
      }

  return (
    <div className='h-screen w-full bg-radiant-homebackground  pl-0 flex flex-col md:flex-row items-start overflow-y-auto pt-20 justify:start md:justify-between hide-scrollbar md:pl-4 '>
     <div className='text-white  mt-3 font-bold shadow-lg shadow-gray-800 p-4'>
        <h1 className='text-2xl pl-2 font-bold text-white'>Add Delivery Boy</h1>
        <div className='flex flex-row  align-center justify-between '>
            <p className='mt-5 pl-2 mr-5 font-bold w-52 '>Name</p>
            <input type='text' name='name' value={deliveryBoyData.name} onChange={handleChannge} placeholder='Name' className=' border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold' />
        </div>
        <div className='flex flex-row  align-center justify-between '>
            <p className='mt-5 pl-2 mr-5 min-w-36 font-bold '>Mobile Number</p>
            <input type='text'name='name' onChange={mobileNumberhandleChannge} disabled={isSendOTP} value={deliveryBoyData.mobileNumber} placeholder='Mobile Number' className=' border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold' />
            {isMobileNumber && <button type='button' onClick={sendOTPHandler}  className={`mt-5 mr-5  font-bold text-sm text-white  rounded-full hover:text-red-600`}>Send OTP</button>}
        </div>
        
        {isSendOTP && <div className='flex flex-row  align-center justify-between '>
        <p className='mt-5 pl-2 min-w-36 mr-5 font-bold text-white'>&nbsp;</p>
        <input type='text' name="otp" value={deliveryBoyData.otp} onChange={handleChannge} placeholder='OTP' className=' border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold' />
        <button type='button' onClick={verifyOTPHandler}  className={`mt-5 mr-5  ${isVerify ? `text-green-400` : `text-white`} font-bold text-sm  rounded-full hover:text-red-600`}>{isVerify?"verified":"verify"}</button>
        </div>}
        
        <div className='flex flex-row  align-center justify-between '>
            <p className='mt-5 pl-2 mr-5 font-bold w-52'>Age</p>
            <input type='number' name='age' value={deliveryBoyData.age} onChange={handleChannge} placeholder='Age' className=' border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold' />
        </div>
        <div className='flex flex-row  align-center justify-between '>
            <p className='mt-5 pl-2 mr-5 font-bold w-52'>Address</p>
            <textarea type='text' name='address' value={deliveryBoyData.address} onChange={handleChannge} placeholder='Address' className=' border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold' />
        </div>
        <div className='flex flex-row  align-center justify-between '>
            <p className='mt-5 pl-2 mr-5 font-bold w-52'>AdhaarCard No</p>
            <input type='number' name='adhaarNumber' value={deliveryBoyData.adhaarNumber} onChange={handleChannge} placeholder='Adhaar' className=' border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-blue-400 font-bold' />
        </div>
        <div className='flex flex-row  align-center justify-between '>
            <p className='mt-5 pl-2 mr-5 font-bold w-52 '>AdhaarCard Photo</p>
            <div className='flex flex-row  '>
            <input type='file' placeholder='Location' onChange={(e)=>handleImageChange(e,setAdhaarURL,setSelectedAdhaarImage)} className=' mt-5  p-1 w-full bg-transparent  text-blue-400 font-bold' />
      {selectedAdhaarImage && (
          <>
            <img
          src={selectedAdhaarImage}
          alt="Selected"
          className="w-32 h-32 object-cover mb-5  border-2 border-gray-300"
        />
       <button name='button' className='bg-red-600 text-white ml-2 rounded-md font-bold flex justify-center items-center w-7 h-5 ' onClick={()=>setSelectedAdhaarImage(null)} >X</button>
      
        </>
      )}
      </div>
        </div>
        <div className='flex flex-row  align-center justify-between '>
        
            <p className='mt-5 pl-2 mr-5 font-bold w-52'>Upload Photo</p>
            <div className='flex flex-row  '>
            <input type='file' placeholder='Location' onChange={(e)=>handleImageChange(e,setPhotoURL,setSelectedPhoto)} className=' mt-5  p-1 w-full bg-transparent  text-blue-400 font-bold' />
      {selectedPhoto && (
          <>
            <img
          src={selectedPhoto}
          alt="Selected"
          className="w-32 h-32 object-cover mb-5  border-2 border-gray-300"
        />
       <button name='button' className='bg-red-600 text-white ml-2 rounded-md font-bold flex justify-center items-center  w-7 h-5 ' onClick={()=>setSelectedPhoto(null)} >X</button>
      
        </>
      )}
      </div>
        </div>
        <div className='mt-5  '>
      <button name='button' className='bg-green-600 text-white hover:bg-green-400 font-bold  p-2 w-36' onClick={registerHandler} >Register</button>
      
      </div> 
     </div>
     <div className='flex flex-col w-full md:w-3/5 m-8 justify-center p-3   pl-2 shadow-lg shadow-gray-800'>

     {showModal && (
        <div className="modal bg-white w-2/3 h-1/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center b-2 border-red-600 z-50 md:w-1/4 ">
          <div className="modal-content mx-4">
            <p className='text-red-600 text-sm font-bold p-2'>Are you sure you want to delete {deliveryMan} ?</p>
            <div className='flex justify-around items-center'>
            <button className='bg-red-600 text-white font-bold px-2' onClick={handleConfirmDelete}>Confirm</button>
            <button className='bg-black text-white font-bold px-3' onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

     <h1 className='text-2xl font-bold text-white mt-3'>Delete Delivery Boy</h1>
     <div className='relative flex flex-row mt-5 align-center justify-between'>
        <p className='mt-5 mr-5 font-bold  text-white'>Select Delivery Boy</p> 
        <div className="relative inline-block">
        <button type='button'  className='relative drowpdown-button w-half  inline-flex justify-center
         w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium 
         text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-500' onClick={toggleDelverBoyDropdown}>{deliveryMan}<span className="caret ml-2">&#9660;</span>
         </button>

      {isMlOpen ? (
    <div className="dropdown-menu h-44 overflow-y-auto absolute right-0 top-10  bg-white w-44  rounded shadow-md">
        {allDeliveryBoy?.map((deliveryBoy, index) => (
        <div className='flex flex-col' onClick={() => {handleDelBoyChange(deliveryBoy.name,deliveryBoy._id) }} key={index}>
        <li key={index} value={deliveryBoy.name} className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100">
        {deliveryBoy.name}
      </li>
      </div>
        ))}
        
      
      </div>
      
      ) : null}
     </div>
      <button name='button' className='bg-red-600 text-white hover:bg-red-400  p-2 ' onClick={deleteWineShopHandler}>Delete</button>
    </div>
   
     </div>
    </div>
  )
}

export default AddDeliveryBoy
