import React,{useState} from 'react'
import ShopReport from '../Components/ReportScreen/ShopReport'
import DeliveryReport from '../Components/ReportScreen/DeliveryReport'

const ReportScreen = () => {
  const [isShopSelected, setIsShopSelected] = useState(true);

  const shopSelectorHandler = () => {
    setIsShopSelected(true);
  };
  const deliverSelectorHandler = () => {
    setIsShopSelected(false);
  };
    
  return (
    
    <div className='h-screen,w-screen flex flex-col pt-20 bg-radiant-homebackground justify-center items-center'>
        <div className='flex   flex-row'>
        <button onClick={shopSelectorHandler} className={`${isShopSelected? `bg-radiant-maroon text-red-500`:`bg-radiant-maroonlight` } text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700`}>Shop Report</button>
        <button onClick={deliverSelectorHandler} className={`${!isShopSelected? `bg-radiant-maroon text-red-500`:`bg-radiant-maroonlight` } text-white px-4 py-2 ml-5 rounded-md font-bold hover:bg-blue-700`}>Delivery Report</button>
        </div>
        <div className='h-1/2 w-full flex justify-center items-start'>
       { isShopSelected? <ShopReport/>:
        <DeliveryReport/>}
        </div>
    </div>
  )
}

export default ReportScreen