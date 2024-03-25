import { Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {IoFastFoodSharp} from 'react-icons/io5'
import { useDispatch } from 'react-redux';
import { sigupAction } from '../../redux/auth/authAction';

const Signup = () => {

    const toast = useToast();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullName: '',
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
        const reqdata = {
            ...formData, role: "ROLE_RESTAURANT_OWNER"
        }
        // console.log(reqdata)
        try {
            const response = await dispatch(sigupAction(reqdata));

            if (response && response.jwt !== null) {
                // setShowSnackbar(true);

                setFormData({
                    fullName: '',
                    email: '',
                    password: ''
                });
                toast({
                    title: "Owner registered",
                    description: "Regiseterd successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });




            } else {
                alert("Email already exists.");
            }

        } catch (error) {
            console.error("Error during signup:", error);
            // Handle error, show error message, etc.
        }
    };


    return (
        <div>
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
                            Register As Restaurant Owner
                        </Text>
                        <FormControl id="fullName" mb={4} isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                focusBorderColor="orange.500"
                            />
                        </FormControl>
                        <FormControl id="email" mb={4} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                focusBorderColor="orange.500"
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
                                focusBorderColor="orange.500"
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="orange" mt={4}>Sign Up</Button>
                        <div className='flex mt-2 '>
                            <p className='mr-1'>  Already registered</p>
                            <button className='text-blue-500' onClick={() => { navigate("/") }}>signin</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup
