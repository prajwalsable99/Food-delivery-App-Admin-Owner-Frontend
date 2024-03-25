import { Box, Button, Checkbox, FormControl, FormLabel, Grid, GridItem, Image, Input, Text, Textarea, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { uploadToCloudinary } from '../../logics/uploadLogic';
import { useDispatch } from 'react-redux';
import { createRestaurantAction } from '../../redux/restaurant/restaurantAction';

const initData = {
     name: "",
     description: "",
     cuisineType: "",

     street: "",
     city: "",
     state: "",
     postalCode: "",
     country: "",



     email: "",
     mobile: "",
     twitter: "",
     instagram: "",



     openingHours: "",
     images: [],
     open: false,


};
const CreateRestaurantPage = () => {
     const token = localStorage.getItem("token-owner");
     const dispatch = useDispatch();

     const toast = useToast();
     const [formData, setFormData] = useState(initData);

     const handleSubmit = async (e) => {
          e.preventDefault();

          const reqdata = {
               name: formData.name,
               description: formData.description,
               cuisineType: formData.cuisineType,
               address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.country
               },
               contactInformation: {
                    email: formData.email,
                    mobile: formData.mobile,
                    twitter: formData.twitter,
                    instagram: formData.instagram
               },
               openingHours: formData.openingHours,
               images: [],
               open: formData.open
          };
          const reqimages = []

          try {
               for (let i of formData.images) {

                    const imgUrl = await uploadToCloudinary(i)
                    reqimages.push(imgUrl)

               }
               reqdata.images = reqimages;
               // console.log(reqdata)


             const flag=  dispatch(createRestaurantAction({ token, data: reqdata }))

               if(flag){
                    toast({
                         title: "Restaurant Registered",
                         description: "Registered successfully.",
                         status: "success",
                         duration: 3000,
                         isClosable: true,
                       });

               }
               setFormData(initData);

          } catch (error) {
               console.log(error)
               alert("Unable to add Restaurant at moment")
          }




     }


     const handleChange = (e) => {
          const { name, value, type } = e.target;

          if (type === 'file') {
               const imagesArray = Array.from(e.target.files);
               setFormData(prevData => ({
                    ...prevData,
                    images: imagesArray
               }));
          } else {
               setFormData((prevData) => ({
                    ...prevData,
                    [name]: type === 'checkbox' ? e.target.checked : value,
               }));

          }

     };

     const handleImageUploadClick = () => {
          document.getElementById("imageInput").click();
     };
     return (
          <div className='w-full mt-20 flex  items-center justify-center '>

               <form onSubmit={handleSubmit} className='w-5/6 bg-white text-black p-8 rounded-lg shadow-lg'>
                    <Text className='text-center' fontSize='md' fontWeight={"bold"}>
                         Add Restaurant Details
                    </Text>

                    <FormControl id="name" mb={4} isRequired>
                         <FormLabel>Restaurant Name</FormLabel>
                         <Input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter  name"
                              focusBorderColor="orange.500" // Orange focus color
                         />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                         <FormLabel htmlFor="open" ml={2} mb={0}>
                              Currently Open
                         </FormLabel>
                         <Checkbox
                              id="open"
                              name="open"
                              isChecked={formData.open}
                              onChange={handleChange}
                              colorScheme="orange"
                         >

                         </Checkbox>

                    </FormControl>
                    <FormControl id="description" mb={4} isRequired>
                         <FormLabel>Description</FormLabel>
                         <Textarea
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              placeholder="Enter description"
                              focusBorderColor="orange.500"
                         />
                    </FormControl>
                    <FormControl id="cuisineType" mb={4} isRequired>
                         <FormLabel>Cuisine Type</FormLabel>
                         <Input
                              type="text"
                              name="cuisineType"
                              value={formData.cuisineType}
                              onChange={handleChange}
                              placeholder="Enter cuisine type"
                              focusBorderColor="orange.500"
                         />
                    </FormControl>



                    <Text fontWeight={"semibold"}>Address <span className='text-red-500'>*</span></Text>
                    <hr className='my-2' />

                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4}>
                         <GridItem>
                              <FormControl id="street" mb={4} isRequired>
                                   <FormLabel>Street</FormLabel>
                                   <Input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        placeholder="Enter street"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>

                         <GridItem>
                              <FormControl id="city" mb={4} isRequired>
                                   <FormLabel>City</FormLabel>
                                   <Input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>

                         <GridItem>
                              <FormControl id="state" mb={4} isRequired>
                                   <FormLabel>State</FormLabel>
                                   <Input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Enter state"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>

                         <GridItem>
                              <FormControl id="postalCode" mb={4} isRequired>
                                   <FormLabel>Postal Code</FormLabel>
                                   <Input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="Enter postal code"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>

                         <GridItem>
                              <FormControl id="country" mb={4} isRequired>
                                   <FormLabel>Country</FormLabel>
                                   <Input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Enter country"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>
                    </Grid>

                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                         <GridItem>
                              <FormControl id="email" mb={4} isRequired>
                                   <FormLabel>Email</FormLabel>
                                   <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>

                         <GridItem>
                              <FormControl id="mobile" mb={4} isRequired>
                                   <FormLabel>Mobile</FormLabel>
                                   <Input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter mobile"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>

                         <GridItem>
                              <FormControl id="twitter" mb={4}>
                                   <FormLabel>Twitter</FormLabel>
                                   <Input
                                        type="text"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleChange}
                                        placeholder="Enter Twitter handle"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>

                         <GridItem>
                              <FormControl id="instagram" mb={4}>
                                   <FormLabel>Instagram</FormLabel>
                                   <Input
                                        type="text"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        placeholder="Enter Instagram username"
                                        focusBorderColor="orange.500"
                                   />
                              </FormControl>
                         </GridItem>
                    </Grid>

                    <FormControl id="openingHours" mb={4} isRequired>
                         <FormLabel>Opening Hours</FormLabel>
                         <Input
                              type="text"
                              name="openingHours"
                              value={formData.openingHours}
                              onChange={handleChange}
                              placeholder="Enter opening hours"
                              focusBorderColor="orange.500"
                         />
                    </FormControl>




                    {/* images */}

                    <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>

                         {/* Hidden file input */}
                         <FormControl id="images" mb={4} isRequired display="none">
                              <Input
                                   type="file"
                                   id="imageInput"
                                   name="images"
                                   onChange={handleChange}
                                   multiple // Allow multiple file selection
                                   accept="image/*" // Accept only image files
                              />
                         </FormControl>

                         {/* Button to trigger file input */}
                         <Box>
                              <Button onClick={handleImageUploadClick}>Select Images</Button>
                         </Box>
                         {/* Display selected images */}
                         {formData.images.map((image, index) => (
                              <Box key={index} position="relative" borderWidth="1px" rounded="lg" overflow="hidden">
                                   <Image src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                              </Box>
                         ))}


                    </Grid>
                    <Button type="submit" colorScheme="orange" mt={4}>Sign in</Button>


               </form>

          </div>
     )
}

export default CreateRestaurantPage
