import React from 'react'
import Breadcrumb from './Navigation'
import PageSearchBox from './PageSearchBox'
import { IoMenuSharp } from "react-icons/io5";

interface NavigationBarProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
}

function NavigationBar({setShowSidebar, showSidebar}: NavigationBarProps) {
  
  return (
    <div className="flex p-4 items-center ">
      <IoMenuSharp className="text-3xl cursor-pointer mr-4 lg:hidden" onClick={()=>setShowSidebar(!showSidebar)}/>
      <div className="ml-auto sm:ml-0">
        <Breadcrumb paths={[{ name: "Home", link: "/" }, { name: "Course" }]} />
        <h1 className="text-2xl font-bold">Course</h1>
      </div>
      <div className='hidden sm:flex ml-auto'>
        <PageSearchBox />
      </div>
  </div>
  )
}

export default NavigationBar