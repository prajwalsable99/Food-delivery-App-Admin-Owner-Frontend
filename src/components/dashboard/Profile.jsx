import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Avatar, Switch } from '@chakra-ui/react';
import { IoFastFood } from "react-icons/io5";
import { AiOutlineMail, AiOutlinePhone, AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai';
import { updateRestaurantStatusAction } from '../../redux/restaurant/restaurantAction';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Profile = () => {
  const token = localStorage.getItem("token-owner");
  const { requser } = useSelector((store) => store.auth);
  const { myrestaurant } = useSelector((store) => store.restaurant);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(myrestaurant?.open);
  const handleSwitchChange = () => {
    const flag = dispatch(updateRestaurantStatusAction({ restaurantId: myrestaurant?.id, token }))
    if (flag) {
      setIsChecked(!isChecked);

    }
  };

  return (
    <div className=' p-6'>

      <div className='flex justify-between w-full bg-white text-black py-8 px-2 mb-2 text-4xl rounded-lg shadow-md'>
        <div className='flex spacex-2'>
          <IoFastFood className='text-orange-500' />
          <h1 className='font-bold'>Restaurant Profile</h1>
        </div>
        <div>
          <span className='text-xl'>Open status</span>
          <Switch isChecked={isChecked} onChange={handleSwitchChange} size="lg" />
        </div>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Part - Slider and Restaurant Details */}
        <div>
          <div className=' p-8  bg-white rounded-lg shadow-md'>
            {
              myrestaurant?.images.length > 1 ?

                <Slider Slider {...settings} className='p-4'>
                  {myrestaurant?.images.map((image, index) => (
                    <div key={index}>
                      <img src={image} className='h-80 w-full object-cover' alt={`Img ${index}`} />
                    </div>
                  ))}
                </Slider>
                :
                <div className="p-4">
                  <img src={myrestaurant?.images[0]} className="h-80 w-full object-cover" alt="Restaurant " />
                </div>


            }
          </div>

          <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              <span className='font-semibold'>Restaurant:</span> {myrestaurant?.name}
            </h2>
            <p className="mb-1">
              <span className='font-semibold'>Description:</span> {myrestaurant?.description}
            </p>
            <p className="mb-1">
              <span className='font-semibold'>Cuisine:</span> {myrestaurant?.cuisineType}
            </p>
            <p className="mb-1">
              <span className='font-semibold'>Opening Hours:</span> {myrestaurant?.openingHours}
            </p>
          </div>

        </div>

        {/* Right Part - Owner and Contact Details */}
        <div className="md:flex md:flex-col justify-between ">

          <div className='flex flex-col  bg-white text-black p-2 rounded-lg shadow-md'>
            <Avatar name={requser?.fullName}></Avatar>
            <p>{requser?.email}</p>
            <p>{requser?.role}</p>


          </div>

          <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-md">



            {/* Contact Information */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Contact Information:</h2>
              <p className="mb-1">
                <AiOutlineMail className="inline-block mr-2" />
                <span className="font-semibold">Email:</span> {myrestaurant.contactInformation?.email}
              </p>
              <p className="mb-1">
                <AiOutlinePhone className="inline-block mr-2" />
                <span className="font-semibold">Mobile:</span> {myrestaurant.contactInformation?.mobile}
              </p>
              <p className="mb-1">
                <AiOutlineTwitter className="inline-block mr-2" />
                <span className="font-semibold">Twitter:</span> {myrestaurant.contactInformation?.twitter}
              </p>
              <p className="mb-1">
                <AiOutlineInstagram className="inline-block mr-2" />
                <span className="font-semibold">Instagram:</span> {myrestaurant.contactInformation?.instagram}
              </p>
            </div>
          </div>

          <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-md">


            <h2 className="text-lg font-semibold mb-2">Address:</h2>
            <p className="mb-1">
              <span className='font-semibold'>Street:</span> {myrestaurant?.address?.street}
            </p>
            <p className="mb-1">
              <span className='font-semibold'>City:</span> {myrestaurant?.address?.city}
            </p>
            <p className="mb-1">
              <span className='font-semibold'>State:</span> {myrestaurant?.address?.state}
            </p>
            <p className="mb-1">
              <span className='font-semibold'>Postal Code:</span> {myrestaurant?.address?.postalCode}
            </p>
            <p className="mb-1">
              <span className='font-semibold'>Country:</span> {myrestaurant?.address?.country}
            </p>

          </div>


        </div>
      </div>
    </div >
  );
};

export default Profile;
