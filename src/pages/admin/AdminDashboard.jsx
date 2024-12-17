import React from 'react'

import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { useAuth } from '../../context/authContext';
import { MdVideoCall } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  const { user, logout } = useAuth();

  return (
    <div>
      <div className='mt-28'>
      {/* content Area */}
      <div className={isOpen ? "pl-80" : ""}>
       <div className='p-4'>

       <Outlet />
       </div>
      </div>
      <Drawer className='mt-14 ' open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Admin Menu" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item 
                      active={location.pathname === "/admin/home"}
                      as={Link} 
                      to={'/admin/home'} 
                      icon={HiChartPie}>
                      Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item 
                      as={Link} 
                      to={'/dashboard/profile'} 
                      icon={HiShoppingBag}
                      active={location.pathname === "/dashboard/profile"}>
                      Profile
                    </Sidebar.Item>
                    <Sidebar.Item 
                      as={Link} 
                      to={"/admin/courses"} 
                      icon={HiUsers}
                      active={location.pathname === "/admin/courses"}>
                      All Courses
                    </Sidebar.Item>
                    <Sidebar.Item 
                      as={Link} 
                      to={"/admin/categories"} 
                      active={location.pathname === "/admin/categories"}
                      icon={HiLogin}>
                      Categories
                    </Sidebar.Item>
                    <Sidebar.Item 
                      active={location.pathname === "/admin/add-course"}
                      as={Link} 
                      to={"/admin/add-course"} 
                      icon={HiPencil}>
                      Add Course
                    </Sidebar.Item>
                    <Sidebar.Item 
                      as={Link} 
                      to={"/dashboard/profile"} 
                      active={location.pathname === "/dashboard/profile"}
                      icon={IoMdAddCircle}>
                      Add Category
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item as={Link} 
                      to={"/admin/upload-video"}  
                       icon={MdVideoCall}>
                      Upload Videos
                    </Sidebar.Item>
                    <Sidebar.Item href="https://flowbite-react.com/" icon={FaBorderAll}>
                      Orders
                    </Sidebar.Item>
                    <Sidebar.Item href="https://flowbite-react.com/" icon={HiCollection}>
                      Users
                    </Sidebar.Item>
                    <Sidebar.Item  
                    icon={HiInformationCircle}
                    onClick={() => {
                      logout();
                    }}
                    >
                      
                      Logout
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    
      </div>
    </div>
  )
}

export default AdminDashboard