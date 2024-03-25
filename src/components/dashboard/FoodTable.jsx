import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFoodAction } from '../../redux/food/foodAction';
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Switch } from '@chakra-ui/react';
import { FaPhotoVideo } from "react-icons/fa";
const FoodTable = ({ foods }) => {

    const token = localStorage.getItem("token-owner");


    const dispatch = useDispatch();

    const handleAvial = (e, foodId) => {

        dispatch(updateFoodAction({ token, foodId }))
    }
    return (
        <div className="overflow-x-auto  h-5/6 overflow-y-auto text-black ">
            <table className="table-auto w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">view</th>

                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Veg</th>
                        <th className="px-4 py-2">Seasonal</th>
                        <th className="px-4 py-2">Available</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="border px-4 py-2">{food?.name}</td>
                            <td className="border px-4 py-2">
                                <Popover>
                                    <PopoverTrigger>
                                        <IconButton icon={<FaPhotoVideo/>}/>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Details</PopoverHeader>
                                        <PopoverBody>
                                            <div className='flex'>
                                                <img src={food?.images.length>0 && food?.images[0]} className='h-32 w-32' alt="foodimg" />
                                               
                                                <p>{food?.description}</p>
                                            </div>


                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>

                            </td>
                            <td className="border px-4 py-2">{food?.price}</td>
                            <td className="border px-4 py-2">{food?.foodCategory?.name}</td>
                            <td className="border px-4 py-2">{food?.vegetarian ? 'Yes' : 'No'}</td>

                            <td className="border px-4 py-2">{food?.seasonal ? 'Yes' : 'No'}</td>
                            <td className="border px-4 py-2"><Switch
                                colorScheme="green"
                                size="md"
                                isChecked={food?.available}
                                onChange={(e) => { handleAvial(e, food?.id) }}
                            />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FoodTable;
