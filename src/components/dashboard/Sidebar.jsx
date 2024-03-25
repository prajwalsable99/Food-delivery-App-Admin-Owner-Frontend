import { FaClipboardList, FaUtensils, FaUser } from 'react-icons/fa'; // Importing icons from Font Awesome
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useColorMode, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { LogoutAction } from "../../redux/auth/authAction";
import { IoFastFoodSharp } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { colorMode } = useColorMode(); // Get the color mode (light or dark)
  const isActive = (path) => {
    return location.pathname === path;
  };



  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={"gray.900"}
          textColor={"whitesmoke"}>
          <DrawerCloseButton />
          <DrawerHeader>



            <p className='w-3/4  rounded-md p-2 cursor-pointer text-center  bg-white shadow-sm' >
              <span className='bg-black pl-2 py-1 rounded-l-md'>Hungry</span>
              <span className='bg-orange-500 pr-2 py-1 rounded-r-md'>Hub</span>
            </p>

          </DrawerHeader>

          <DrawerBody>


            <div className="h-full flex flex-col ">
              <ul className=" justify-between px-4 py-2 bg-gray-800 h-[90vh]">
                <li className="mb-2" >
                  <Link
                    to="/"
                    className={`text-white hover:bg-gray-700 px-3 py-2 rounded-md flex items-center ${isActive("/") ? "bg-orange-500" : ""
                      }`}
                  >
                    <FaUser className="mr-2" /> {/* Icon */}
                    <div>
                      <span>Profile</span> {/* Name */}
                      
                    </div>
                  </Link>
                </li>
                <li className="mb-2" >
                  <Link
                    to="/orders"
                    className={`text-white hover:bg-gray-700 px-3 py-2 rounded-md flex items-center ${isActive("/orders") ? "bg-orange-500" : ""
                      }`}
                  >
                    <FaClipboardList className="mr-2" /> {/* Icon */}
                    <div>
                      <span>Orders</span> {/* Name */}
                      
                    </div>
                  </Link>
                </li>
                <li className="mb-2" >
                  <Link
                    to="/food"
                    className={`text-white hover:bg-gray-700 px-3 py-2 rounded-md flex items-center ${isActive("/food") ? "bg-orange-500" : ""
                      }`}
                  >
                    <FaUtensils className="mr-2" /> {/* Icon */}
                    <div>
                      <span>Food</span> {/* Name */}
                     
                    </div>
                  </Link>
                </li>

              </ul>
            </div>


          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Sidebar;
