import { Box, Button, Flex, Input, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, getAllCategoriesAction, getAllFood } from '../../redux/food/foodAction';
import AddFood from './AddFood';
import FoodTable from './FoodTable';

const Food = () => {
  const token = localStorage.getItem("token-owner");
  const { myrestaurant } = useSelector((store) => store.restaurant);
  const { categories, createdcategory,createdfood ,foods,updatedfood} = useSelector((store) => store.food);
  const dispatch = useDispatch();
  const [newcategory, setNewCategory] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(getAllCategoriesAction({ token, restaurantId: myrestaurant?.id }));
  }, [createdcategory]);

  useEffect(() => {
    const reqdata={
      token,
      restaurantId: myrestaurant?.id,
      isseasonal:false,
      isveg:false,
      isnonveg:false
    }
    dispatch(getAllFood(reqdata));
  }, [createdfood,updatedfood]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const reqdata = {
      restaurantId: myrestaurant?.id,
      name: newcategory
    };
    const flag = dispatch(createCategoryAction({ token, data: reqdata }));

    if (flag) {
      console.log("added new category");
      setNewCategory("");
    }
  };




  return (
    <div className=''>
      <Flex direction={{ base: "column", md: "row" }} p={4} className=''>
        {/* Left Part */}
        <Box flex={{ base: "none", md: "0 0 20%" }} className='h-[75vh]' mr={{ base: 0, md: 4 }}  >
          {/* Add Category Form */}
          <form onSubmit={handleSubmit}>
            <Flex mb={4} alignItems="center">
              <Input
                type="text"
                placeholder="Add Category"
                className=" rounded-md px-2 py-1 border text-sm focus:border-orange-500"
                required
                value={newcategory}
                onChange={(e) => setNewCategory(e.target.value)}
                focusBorderColor="orange.400"
                errorBorderColor="red.500"
              />
              <Button type="submit"  ml={2} className='p-2 text-xs' colorScheme="orange" size="sm">
                Add 
              </Button>
            </Flex>
          </form>
          {/* List of Categories */}
          <Box className=' p-4 h-5/6 overflow-y-auto rounded-md p-2'>
            {categories.length > 0 && categories.map((item) => (
              <Box
                key={item?.id}
                mb={2}
                p={4}
                bgColor="gray.500"
                rounded="md"
                _hover={{ bgColor: "orange.400", cursor: "pointer" }}
              >
                <Text fontSize="lg" fontWeight="bold">{item?.name}</Text>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Part */}
        <Box flex="1" className='h-[75vh]' >
          
          {/* Button to Add Food */}
          <Flex justifyContent="flex-end" mb={4}>
            {/* Add Food Button */}
            <Button colorScheme="green" onClick={onOpen} >
              Add Food
            </Button>
          </Flex>

          {/* List of Foods */}
         
            <FoodTable foods={foods}/>
          
          
        </Box>

      </Flex>

      <AddFood isOpen={isOpen} onClose={onClose} availableCategories={ categories}/>
    </div>
  );
};

export default Food;
