import React, { useEffect,useState,useRef,useCallback } from 'react'
import { getAllDeliveryBoy } from '../../Helpers/ReportScreen/getAllDeliveryBoy'
import { months, years } from '../../Helpers/ReportScreen/monthYearArray'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { dateConvertor } from '../../Helpers/dateConvertor';
import { fetchDailyDeliveryReport } from '../../Redux/Slices/dailyDeliveryBoyReportSlice';
import { fetchMonthlyDeliveryReport } from '../../Redux/Slices/monthlyDeliveryReport';
import { fetchYearlyDeliveryReport } from '../../Redux/Slices/yearlyDeliveryReportSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../../Helpers/ReportScreen/customDatepicker.css'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useReactToPrint } from 'react-to-print';





const DeliveryReport = () => {
    const [deliveryBoyData,setDeliveryBoyData] = useState([])
    const [selectedDeliveryBoy,setSelectedDeliveryBoy] = useState();
    const [selectedDeliveryBoyID,setSelectedDeliveryBoyID] = useState();
    const [startDate, setStartDate] = useState(format(new Date(),'MM-dd-yyyy'));
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [deliveryReport, setDeliveryReport] = useState();
    const [isDeliveryId,setIsDeliveryId] = useState(false);
    const [isDateSelected,setIsDateSelected] = useState(true);
    const [loading,setLoading] = useState(false);
    const tableref = useRef(null);
    const printRef = useRef(null);
  
    const combinedRef = useCallback((node) => {
      tableref.current = node;
      printRef.current = node;
    }, []);

    const dispatch = useDispatch()
   
    
    useEffect(() => {
        getAllDeliveryBoy(setDeliveryBoyData)
    },[])

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
      documentTitle: selectedDeliveryBoy,
      onAfterPrint: () => {
        // Perform any additional actions after printing
      },
    });

    const {onDownload} = useDownloadExcel({
      currentTableRef: tableref.current,
      filename: 'DeliveryReport',
      sheet: selectedDeliveryBoy,
    });

    console.log("deliveryReport ========>",deliveryReport)
    const handleMonthChange = (event) => {
      setSelectedMonth(event.target.value);
      setIsDateSelected(false)
      setSelectedYear("");
    };
    const handleYearChange = (event) => {
      setSelectedYear(event.target.value);
      setIsDateSelected(false);
      setSelectedMonth("");
    };
    const handleDateChange = (date) => {
      if(date){
        setStartDate(format(date, 'yyyy-MM-dd'))
        setIsDateSelected(true)
        setSelectedMonth("");
        setSelectedYear("");
      }
    }
    
  
    const deliveryBoyHandler = (id,name) => {
      if(id){
        setIsDeliveryId(true)
        setIsDateSelected(true)
        setSelectedMonth("");
        setSelectedYear("");
        setSelectedDeliveryBoyID(id)
        setSelectedDeliveryBoy(name)
        setLoading(true);
        dispatch(fetchDailyDeliveryReport({startDate,selectedDeliveryBoyID:id})).then((Response)=>{
          setDeliveryReport(Response.payload || [])
        }).catch((error) => {
          console.error("Error fetching delivery report:", error);
          // Optionally, handle the error state here
        })
        .finally(() => {
          // Set loading to false once data fetching is complete
          setLoading(false);
        });
    }
    else{
     setIsDeliveryId(false)
    }
  }

    useEffect(()=>{
      if(selectedDeliveryBoyID){
      setIsDeliveryId(true)
      dispatch(fetchDailyDeliveryReport({startDate,selectedDeliveryBoyID})).then((Response)=>{
      setDeliveryReport(Response.payload || [])
      
     })}
     else{
     setIsDeliveryId(false) 
     }
    },[startDate])

    useEffect(()=>{
      setLoading(true);
      dispatch(fetchMonthlyDeliveryReport({selectedMonth,selectedDeliveryBoyID})).then((Response)=>{
        setDeliveryReport(Response.payload || [])
      }) .catch((error) => {
        console.error("Error fetching delivery report:", error);
        // Optionally, handle the error state here
      })
      .finally(() => {
        // Set loading to false once data fetching is complete
        setLoading(false);
      });
    },[selectedMonth])

    useEffect(()=>{
      setLoading(true);
      dispatch(fetchYearlyDeliveryReport({selectedYear,selectedDeliveryBoyID})).then((Response)=>{
        setDeliveryReport(Response.payload || [])
      }).catch((error) => {
        console.error("Error fetching delivery report:", error);
        // Optionally, handle the error state here
      })
      .finally(() => {
        // Set loading to false once data fetching is complete
        setLoading(false);
      });
    },[selectedYear])

  if(loading){
    return <div className='w-full bg-red-600 text-white rounded-md shadow-lg font-bold mt-4 p-2'> Loading...</div>
  }
    
  return (
    <div className='flex flex-col w-full justify-between md:flex-row mt-0  p-4 h-screen  '>
        <div className='flex flex-row md:flex-col justify-center md:justify-start items-center md:ml-0 flex-wrap rounded-md mt-1 bg-gray-400 shadow-md h-28 md:h-full w-full md:w-52 overflow-x-auto '>
            
          {deliveryBoyData.map((deliveryBoy)=>(
            <div key={deliveryBoy._id}>
                <button type='button' onClick={()=>deliveryBoyHandler(deliveryBoy._id,deliveryBoy.name)} className={`${deliveryBoy._id ===selectedDeliveryBoyID ? `bg-radiant-homebackground text-red-500 ` : `bg-gray-400`} p-2 mx-2 shadow-lg hover:bg-violet-800 rounded-md w-40 text-white font-bold my-2`}>{deliveryBoy.name.toUpperCase()}</button>
            </div>
          ))}
        </div>
       
    <div className='flex flex-col justify-start h-full w-full ml-0 md:ml-3 mt-1 items-start'>
        
    <div className='flex flex-row w-full  flex-wrap bg-gray-400  pl-3 py-3' >
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

    {isDeliveryId ? (
      <div className='flex flex-col h-2/3 w-full'>
        {/* Header Section */}
        <div className='bg-radiant-maroon p-2 text-white font-bold w-full text-sm mt-3 rounded-md'>
          <h1>{selectedDeliveryBoy.toUpperCase()}</h1>
          <h1>Total Trip: {deliveryReport?.totalTrip || "--"}</h1>
          <h1>Total KM: {deliveryReport?.totalKM || "--"}</h1>
          <h1>Products Delivered: {deliveryReport?.totalProduct || "--"}</h1>
        </div>
        <div className="flex flex-col w-full h-full justify-start mt-3  over-flow-y-auto">
        
        <div className=" h-full overflow-y-auto">
          <table className='min-w-full divide-y divide-gray-200' ref={combinedRef}>
            <thead className='bg-gray-400 text-white'>
              <tr>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>Delivered By</th>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>Mobile Number</th>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>Order Date</th>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>Order ID</th>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>KM</th>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>Status</th>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>Shop Name</th>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>Delivery Address</th>
                <th className='px-2 py-3 shadow-md text-orange-400 text-center text-xs font-medium uppercase tracking-wider'>Pincode</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {deliveryReport?.orders?.map((order, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{order?.delevaryBoyId?.name || "--"}</td>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{order?.delevaryBoyId?.mobileNumber || "--"}</td>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{dateConvertor(order.createdAt) || "--"}</td>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{order?.confirmOrder?.orderId || "--"}</td>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{order?.KM || "--"}</td>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{order.status || "--"}</td>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{order?.confirmOrder?.shopDetails?.ShopName || "--"}</td>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{order?.confirmOrder?.customerAddress?.localAddress?.apartmentRoadArea || "--"}</td>
                  <td className='px-2 py-4 whitespace-wrap text-sm text-gray-500'>{order?.confirmOrder?.customerAddress?.localAddress?.pinCode || "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>):
      <div className='w-full bg-red-600 text-white rounded-md shadow-lg font-bold mt-4 p-2 '> SELECT DELIVERY BOY</div>}
      

    <div>
    </div>
    </div>
           
        
    </div>
  )
}

export default DeliveryReport