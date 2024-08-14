import React,{useState} from 'react'
import Navbar from '../Components/Navbar'
import SideBars from '../Components/SideBars';
import AddProductScreen from '../userScreens/AddProductScreen';
import { Outlet } from 'react-router-dom';
import ViewProducts from '../userScreens/ViewProducts';
import sooraLogo from '../assets/soora.png'



function Navigation() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const handleSideBarToggle = () => {
        setIsSideBarOpen(!isSideBarOpen);
      };
    
  return (
    <div className="flex flex-col h-full bg-radiant-homebackground ">
    <div className="fixed top-0 left-0 w-full z-10">
      <Navbar handleSideBarToggle={handleSideBarToggle} isSideBarOpen={isSideBarOpen}  />
      </div>
      <div className="flex flex-grow ">
      <div
        className={`h-full mt-0 w-44 bg-radiant-homebackground   flex flex-col  items-center p-4  transform transition-transform duration-300 ease-in-out ${
        isSideBarOpen ? 'translate-x-0' : '-translate-x-44'
        }`}
      >
      <SideBars/>
     </div>
     <div className="flex-grow ml-0 mt-0 "   >
    
          <Outlet /> 
        
        </div>
   
     </div>
     </div>
  )
}

export default Navigation
