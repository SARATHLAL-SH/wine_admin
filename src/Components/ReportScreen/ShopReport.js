import React, { useEffect, useState,useRef,useCallback } from 'react'
import { getAllShops } from '../../Helpers/AddShopScreen/getAllShops';
import { useDispatch,useSelector } from 'react-redux';
import { fetchDailyReport } from '../../Redux/Slices/dailyShopReportSlice';
import { fetchMonthlyShopReport } from '../../Redux/Slices/monthlyShopReportSlice';
import { fetchYearlyShopReport } from '../../Redux/Slices/yearlyshopReportSlice';
import { dateConvertor } from '../../Helpers/dateConvertor';
import { usePDF,pdf } from 'react-to-pdf';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import '../../index.css'
import { months,years } from '../../Helpers/ReportScreen/monthYearArray';
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useReactToPrint } from 'react-to-print';



const ShopReport = () => {
  const [allShops,setAllShops] =  useState();
  const [search,setSearch] =useState();
  const [ordersearch,setOrderSearch] =useState();
  const [selectedShop,setSelectedShop] = useState();
  const [selectedShopID,setSelectedShopID] = useState();
  const [pdfData,setPdfData] = useState();
  const [startDate, setStartDate] = useState(format(new Date(),'yyyy-MM-dd'));
  const [shopReports,setShopReports] = useState();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isShopId,setIsShopId] = useState(false);
  const [isDateSelected,setIsDateSelected] = useState(true);
 
  const tableref = useRef(null);
  const printRef = useRef(null);
  const pdfRef = useRef(null);

  const combinedRef = useCallback((node) => {
    tableref.current = node;
    printRef.current = node;
    pdfRef.current = node;
  }, []);
 
  
  console.log("seletedShopID=====>",selectedShopID);
  const dispatch = useDispatch();

  const {onDownload} = useDownloadExcel({
    currentTableRef: tableref.current,
    filename: 'ShopReport',
    sheet: selectedShop,
  });
 
  
  const filterProducts = allShops?.filter(shop => shop?.ShopName?.toLowerCase().startsWith(search?.toLowerCase()))
  const displayProducts = filterProducts?.length>0 ? filterProducts : allShops
  
  const filterOrderID = shopReports?.orders?.filter(order => (String(order?.confirmOrder?.orderId))?.startsWith (String(ordersearch)))

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'ShopReport',
    onAfterPrint: () => {
      // Perform any additional actions after printing
    },
  });
 

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setIsDateSelected(false)
    setSelectedYear("");
    setStartDate(format(new Date(),'yyyy-MM-dd'));
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setIsDateSelected(false)
    setSelectedMonth("");
    setStartDate(format(new Date(),'yyyy-MM-dd'));
  };

  useEffect(()=>{
    getAllShops(setAllShops)
  },[])
 
  const selectedShopHanlder = (shopName, id) => {
    if(id){
    
    dispatch(fetchDailyReport({startDate,selectedShopID:id})).then((response)=>{
    setShopReports(response.payload ||[])
    setIsShopId(true)
    setIsDateSelected(true)
    setSelectedShop(shopName);
    setSelectedShopID(id);
    setSelectedMonth("");
    setSelectedYear("");
    })
    }
    else{
      setIsShopId(false)
    }
    
  }
  
  const handleDateChange = (date) => {
    if(date){
      setStartDate(format(date, 'yyyy-MM-dd'))
      setSelectedMonth('');
      setSelectedYear('');
      setIsDateSelected(true)
    }
  }

  useEffect(()=>{
    if(startDate){
    dispatch(fetchDailyReport({startDate,selectedShopID})).then((response)=>{
      setShopReports(response.payload || [])
    })
    }
  },[startDate])
  
  useEffect(()=>{
    if(selectedMonth){
    dispatch(fetchMonthlyShopReport({selectedMonth,selectedShopID})).then((response)=>{
      setShopReports(response.payload || [])
    })
    }
  },[selectedMonth])

  useEffect(()=>{
    if(selectedYear){
    dispatch(fetchYearlyShopReport({selectedYear,selectedShopID})).then((response)=>{
      setShopReports(response.payload || [])
    })
    }
  },[selectedYear])
  
  return (
    <div  className='flex flex-col w-full justify-between md:flex-row mt-1  p-4 h-screen '>
    <div className='flex flex-row flex-wrap md:flex-col justify-center md:justify-start items-center mb-3 h-28 md:h-full  w-full md:w-52 px-2   shadow-md rounded-md  overflow-y-auto hide-scrollbar bg-gray-400   '>
   
    {displayProducts?.map((shop,index)=>(
      <div key={index} className='flex flex-col flex-wrap md:flex-row shadow-lg  w-40 mt-2 ml-1  justify-center  items-center '>
      <button type='button' onClick={()=>selectedShopHanlder(shop.ShopName,shop._id)} className= {`text-white px-4 py-2 w-40 mb-2 rounded-md font-bold hover:bg-violet-800 ${shop._id===selectedShopID ? `bg-radiant-homebackground text-red-500 `: `bg-gray-400`}`} >{shop.ShopName } </button>
      </div>
    ))}  
    </div>

    <div className='flex flex-col justify-start h-full w-full ml-0 md:ml-3 mt-0 items-start'>
    
    <div className='flex flex-row w-full flex-wrap bg-gray-400  pl-3 py-3' >
    <div className="px-2 ,md:px-0 ">
      <DatePicker className={`${isDateSelected ? `bg-radiant-homebackground text-red-500`: `bg-gray-400`} shadow-lg p-2 text-white font-bold w-40 rounded-md custom-datepicker`}
       
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
      />
    </div>
    <div className="px-2">
    
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className={`${selectedMonth ? `bg-radiant-homebackground text-red-500`: `bg-gray-400` } shadow-lg p-2 text-white w-40 font-bold rounded-md`}
      >
        <option value="" className='font-bold bg-white text-black '>Monthly Report</option>
        {months?.map((month, index) => (
          <option className='font-bold bg-blue-300' key={index} value={index+1}>
            {month}
          </option>
        ))}
      </select>
     
    </div>
    <div className="px-2">
      
      <select
        value={selectedYear}
        onChange={handleYearChange}
        className={`${selectedYear ? `bg-radiant-homebackground text-red-500`: `bg-gray-400` } shadow-lg p-2 text-white w-40 font-bold rounded-md`}
      >
        <option className='font-bold bg-white text-black' value="">Yearly Report</option>
        {years?.map((year, index) => (
          <option key={index} className='font-bold bg-blue-300' value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  
      <button onClick={onDownload} className="bg-gray-400 shadow-md text-green-400 px-4  py-2 rounded-md">
        export to Excel
      </button>
      <button onClick={handlePrint} className="bg-gray-400 shadow-md text-yellow-500 px-4  py-2 rounded-md">
        Print
      </button>
    </div>
    
    { isShopId ? <div  className='flex flex-col justify-start h-full w-full md:w-full  ml-0  mt-3 p-2 bg-gray-400 overflow-y-auto hide-scrollbar items-start '>
      <div className='  '>
    <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder='Search Shop' className='bg-gray-300  pl-2 mb-2  shadow-md focus:outline-none   mt-3   w-full  '/> 
    </div>
    <div className='w-full bg-radiant-maroon shadow-md text-gray-400 mb-2 p-2'>
    {/* <input type='number' value={search} onChange={(e)=>setOrderSearch(e.target.value)}  placeholder='Search OrderID' className='bg-gray-100 text-black pl-2 mb-2  rounded-md shadow-sm focus:border-indigo-300  ml-2 mt-3 focus:ring-opacity-50  w-1/2 md:w-1/3 md:ml-48 '/> */}
    <h1 className='text-xl font-bold text-gray-400  whitespace-nowrap animation-slide-right-left'>{selectedShop?.toUpperCase() || "SELECT SHOP"}</h1>
    <p className='font-bold text-gray-400'>Total Order: {shopReports?.orders?.length ||"No Data"}</p>
    <p className='font-bold text-gray-400'>Total Turnover: {shopReports?.totalGrandTotalPrice || "--"}</p>
    </div>
    <div className="flex flex-col w-full h-full justify-start mt-3  over-flow-y-auto">
    {isShopId ? (
      <div className=" h-full overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200"  ref={combinedRef}>
          <thead className="bg-gray-200">
            <tr>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">Order ID</th>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">Date</th>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">Product Total</th>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">Grand Total</th>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">Delivery Charge</th>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">Service Charge</th>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">Payment ID</th>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">DeliveryBoy</th>
              <th className="px-1 py-3 text-center text-xs font-medium shadow-md text-orange-500 uppercase tracking-normal">Products</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shopReports?.orders?.map((report, index) => {
              const cartDetails = report.confirmOrder?.isShop 
                ? report.confirmOrder.cartIdBuyFromTheShop[0]?.shopData 
                : report.confirmOrder.cartId;
                const rowClass = index % 2 === 0 ? 'bg-gray-100' : 'bg-indigo-100';

              return (
                <tr key={report._id} className={rowClass}>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-red-500">{report?.confirmOrder?.orderId || "--"}</td>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-gray-500">{dateConvertor(report?.confirmOrder?.createdAt || "--")}</td>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-gray-500">{report?.confirmOrder?.totalPriceSum || "--"}</td>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-gray-500">{report?.confirmOrder?.grandTotalPrice || "--"}</td>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-gray-500">{report?.confirmOrder?.deliveryCharge || "--"}</td>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-gray-500">{report?.confirmOrder?.serviceCharges || "--"}</td>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-gray-500">{report?.confirmOrder?.paymentId || "--"}</td>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-gray-500">{report?.delevaryBoyId?.name || "--"}</td>
                  <td className="px-1 py-4 whitespace-wrap text-sm font-bold text-gray-500">
                    {cartDetails?.map((cart, index) => (
                      <div key={index} className="flex flex-col ">
                        <div className="flex flex-row justify-between bg-indigo-100 px-2 items-center">
                          <p className='text-red-300'>P. {index + 1}: {cart.name || "--"}</p>
                          <p>Qty: {report?.confirmOrder?.isShop ? cart.count : cart?.quantity || "--"}</p>
                        </div>
                        <div className="flex flex-row justify-between bg-gray-100 px-2 items-center">
                          <p>Ml: {cart.miligram || "--"}</p>
                          <p>₹ {cart.price || "--"}</p>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <div className='w-full bg-red-600 text-white shadow-lg rounded-md font-bold ml-0 mt-4 p-2 '> SELECT SHOP</div>
    )}
  </div>
    </div> : 
    <div className='w-full bg-red-600 text-white shadow-lg rounded-md font-bold ml-0 mt-4 p-2 '> SELECT SHOP</div>}

    </div>
    </div>
    
  )
}

export default ShopReport