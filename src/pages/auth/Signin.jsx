import { useToast } from '@chakra-ui/react';
import {IoFastFoodSharp} from 'react-icons/io5'
import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { siginAction } from '../../redux/auth/authAction';
const Signin = () => {
    const toast = useToast();
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
       
        email: '',
      
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
    
        try {
        
    
          const response = await dispatch(siginAction(formData))
    
          if (response && response.jwt !== null && response.role=== "ROLE_RESTAURANT_OWNER") {
            
            setFormData({
              email: '',
              password: ''
            }
    
            )
            toast({
                title: "Owner signed in",
                description: "Sign in successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
    
              setTimeout(() => {
                navigate("/");
              }, 1000); 
    
          } else {
            alert("invalid credentials");
          }
        } catch (error) {
          console.error("Error during signin:", error);
          // Handle error, show error message, etc.
        }
      };
    

    return (

        <div className='mt-20 flex flex-col items-center justify-center'>
            <div className='flex bg-white w-1/3 rounded-md mb-4 py-5 space-x-2 items-center justify-center'>
                    <IoFastFoodSharp className=' text-5xl cursor-pointer text-xl text-orange-500' />
                    <p className='rounded-md p-2 cursor-pointer' onClick={() => { navigate("/") }}>
                        <span className='bg-black pl-2 py-1 rounded-l-md'>Hungry</span>
                        <span className='bg-orange-500 pr-2 py-1 rounded-r-md'>Hub</span>
                    </p>
                </div>
            
            <div className='w-1/3 m'>

            <form onSubmit={handleSubmit} className='bg-white text-black p-8 rounded-lg shadow-lg'>
            <Text className='text-center' fontSize='md' fontWeight={"bold"}>
                            Login As Restaurant Owner
                        </Text>
                    
                    <FormControl id="email" mb={4} isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            focusBorderColor="orange.500" // Orange focus color
                        />
                    </FormControl>
                   
                    <FormControl id="password" mb={4} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            focusBorderColor="orange.500" // Orange focus color
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="orange" mt={4}>Sign in</Button>

                    <div className='flex mt-2 '>
                        <p className='mr-1'>  Don't have account</p>

                        <button className='text-blue-500' onClick={() => { navigate("/signup") }}>signup</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Signin
