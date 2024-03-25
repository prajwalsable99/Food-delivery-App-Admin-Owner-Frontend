import { Flex, IconButton, Image, useDisclosure, useToast } from "@chakra-ui/react";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcDataConfiguration } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { LogoutAction } from "../../redux/auth/authAction";
import Sidebar from "./Sidebar";
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log("logged out");
        toast({
            title: "User Logged out",
            description: "Logged out successfully.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
        dispatch(LogoutAction());
    };

    return (
        <div>

            <div className="w-full flex justify-between  py-2 px-6 items-center fixed top-0 z-10 bg-gray-800 bg-opacity-70 shadow-md ">
                {/* Hamburger icon */}
                <div className="flex">
                    <IconButton
                        onClick={onOpen}
                        icon={<FcDataConfiguration  className="text-4xl"/>}
                        aria-label="Menu"
                        variant="ghost"
                        color="white"
                        size="md"
                    />
                    <p className='w-3/4 text-xs rounded-md p-2 cursor-pointer text-center' >
                        <span className='bg-black pl-2 py-1 rounded-l-md'>Hungry</span>
                        <span className='bg-orange-500 pr-2 py-1 rounded-r-md'>Hub</span>
                    </p>
                </div>

                {/* Logo icon */}

                <IconButton
                    onClick={handleLogout}
                    icon={<IoMdLogOut  className="text-3xl" />}
                    aria-label="Menu"
                    variant="ghost"
                    color="white"
                    size="md"
                />


            </div>
            <Sidebar isOpen={isOpen} onClose={onClose} />
        </div>
    );
};

export default Navbar;
