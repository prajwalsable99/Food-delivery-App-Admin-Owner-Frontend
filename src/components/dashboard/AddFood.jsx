import { Box, Button, Flex, FormControl, FormLabel, Grid, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Switch, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloudinary } from '../../logics/uploadLogic';
import { createFoodAction } from '../../redux/food/foodAction';


const AddFood = ({ isOpen, onClose, availableCategories }) => {

    const initdata=      {
        name: "",
        description: "",
        categoryName: availableCategories.length > 0 ? availableCategories[0].name : "",
        price: 0,
        images: [],
        veg: false,
        seasonal: false,
        available: false,
    };
    const [foodData, setFoodData] = useState(  initdata    );

    const doOnCLose=()=>{
        onClose();
        setFoodData(initdata);
    }
    const token = localStorage.getItem("token-owner");
    const { myrestaurant } = useSelector((store) => store.restaurant);
    
    const dispatch = useDispatch();

    const toast = useToast();
    const handleChange = (e) => {
        const { name, value, type} = e.target;

        if (type === 'file') {
            const imagesArray = Array.from(e.target.files);
            setFoodData(prevData => ({
                ...prevData,
                images: imagesArray
            }));
        } else {
            setFoodData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? e.target.checked : value,
            }));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const reqdata = {
            ...foodData, restaurantId:myrestaurant?.id
        }

        if(foodData.categoryName===""){
                reqdata.categoryName=availableCategories[0].name;
        }
        
        // console.log(reqdata)
        const reqimages = []

        try {
             for (let i of foodData.images) {

                  const imgUrl = await uploadToCloudinary(i)
                  reqimages.push(imgUrl)

             }
             reqdata.images = reqimages;
            //  console.log(reqdata)


           const flag=  dispatch(createFoodAction({ token, data: reqdata }))

             if(flag){
                  toast({
                       title: "food Added",
                       description: "added successfully.",
                       status: "success",
                       duration: 3000,
                       isClosable: true,
                     });

                     doOnCLose();
             }

        } catch (error) {
             console.log(error)
             alert("Unable to add food at moment")
        }

    };

    return (
        <Modal onClose={doOnCLose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent bg="gray.800" color="white">
                <ModalCloseButton />
                <ModalBody>
                    <Flex justify="center" mt={8}>
                        <Box maxW="400px" w="100%" p={4} borderRadius="md" boxShadow="md">
                            <form onSubmit={handleSubmit}>
                                <FormControl mb={4} isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" name="name" value={foodData.name} onChange={handleChange} focusBorderColor="orange.500" required />
                                </FormControl>
                                <FormControl mb={4} isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Input type="text" name="description" value={foodData.description} onChange={handleChange} focusBorderColor="orange.500" required />
                                </FormControl>
                                <FormControl mb={4} isRequired>
                                    <FormLabel>Category Name</FormLabel>
                                    <Select name="categoryName" value={foodData.categoryName} onChange={handleChange} focusBorderColor="orange.500" required>
                                        {availableCategories.map(category => (
                                            <option
                                            className='text-black'
                                            key={category.id} value={category.name}>{category.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl mb={4} isRequired>
                                    <FormLabel>Price</FormLabel>
                                    <Input type="number" name="price" value={foodData.price} onChange={handleChange} focusBorderColor="orange.500" required />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Veg</FormLabel>
                                    <Switch name="veg" isChecked={foodData.veg} onChange={handleChange} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Seasonal</FormLabel>
                                    <Switch name="seasonal" isChecked={foodData.seasonal} onChange={handleChange} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Available</FormLabel>
                                    <Switch name="available" isChecked={foodData.available} onChange={handleChange} />
                                </FormControl>
                                <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>
                                    <FormControl id="imgs" mb={4} isRequired>
                                        <Input type="file" name="images" onChange={handleChange} multiple accept="image/*" />
                                    </FormControl>
                                    {foodData.images.map((image, index) => (
                                        <Box key={index} position="relative" borderWidth="1px" rounded="lg" overflow="hidden">
                                            <Image src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                                        </Box>
                                    ))}
                                </Grid>
                                <Button colorScheme="blue" type="submit">Add Food</Button>
                            </form>
                        </Box>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddFood;