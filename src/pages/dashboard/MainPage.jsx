import { Box, Center, Container, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Orders from '../../components/dashboard/Orders'
import Food from '../../components/dashboard/Food'
import Profile from '../../components/dashboard/Profile'
import Navbar from '../../components/dashboard/Navbar'

const MainPage = () => {


  return (
    <div className='w-full'>

      {/* Left Navigation Sidebar */}
      <Navbar/>

      
        
     

     
      <Center>
        <div className='mt-20 w-5/6 pt-2'> {/* Set max width and padding */}
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/food" element={<Food />} />
          </Routes>
        </div>
      </Center>
      
    </div>
  )
}

export default MainPage
