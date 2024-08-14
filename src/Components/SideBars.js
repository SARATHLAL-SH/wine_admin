import React from 'react'
import { Link,useLocation } from 'react-router-dom';

function SideBars() {
    const location = useLocation();

    const menu = [
        {
            name: 'Add Product',
            link: '/home',
        },
        {
            name: 'View Products',
            link: '/ViewProducts',
        },
        {
            name: 'Add Shops',
            link: '/AddShops',
        },
        {
            name: 'Add Delivery Boy',
            link: '/AddDeliveryBoy',
        },
        {
            name: 'Reports',
            link: '/Reports',
        }
    ]
    const isActive = (path) => {
        return location.pathname === path;
      };
  return (
    <div className='bg-radiant-homebackground   h-screen w-44 flex flex-col px-2 items-start pt-14  justify-start  '>
    
    {menu.map((item, index) => (
        <Link key={index} to={item.link} className={`text-white p-2 w-40 rounded-md border-white shadow-sm shadow-white my-4 font-bold mix-blend-overlay hover:shadow-blue-200 ${
              isActive(item.link) ? 'bg-fuchsia-600 ' : ''
            }`}>{item.name}</Link>))}
    </div>
  )

}

export default SideBars
