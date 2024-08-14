import React from 'react'
import CustomerVerification from '../Components/VerificationScreen/CustomerVerification'
import DeliveryBoyVerification from '../Components/VerificationScreen/DeliveryBoyVerification'

const VerificationScreen = () => {
  const [isSelected, setIsSelected] = React.useState(true);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };
  return (
    <div className='pt-20 h-full  flex flex-col justify-start p-2  items-center'>
    <div className=' font-bold text-white   '>
        <button type='button' onClick={handleButtonClick} className={`${isSelected ? `bg-blue-700` :`bg-blue-500`} w-28 hover:bg-blue-600  mr-8`}>Customer</button>
        <button type='button' onClick={handleButtonClick} className={`${!isSelected ? `bg-blue-700` :`bg-blue-500`} w-28 hover:bg-blue-600  mr-8`}>Delivery Boy</button>
    </div>
    <div className='bg-radiant-homebackground w-full h-screen shadow-lg shadow-gray-800 justify-center items-start  my-8  '>
      {isSelected ?  <CustomerVerification/> :
       <DeliveryBoyVerification/>}
    </div>
   </div>

  )
}

export default VerificationScreen