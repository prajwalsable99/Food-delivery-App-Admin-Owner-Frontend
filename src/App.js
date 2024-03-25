// import { Box, Heading, Text } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import MainPage from "./pages/dashboard/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { requserAction } from "./redux/auth/authAction";
import CreateRestaurantPage from "./components/restaurant/CreateRestaurantPage";
import { getMyRestaurantAction} from "./redux/restaurant/restaurantAction";


function App() {

  const token = localStorage.getItem("token-owner");
  const dispatch = useDispatch();





  useEffect(() => {
    if (token) {
      dispatch(requserAction(token));
      dispatch(getMyRestaurantAction(token))
    }
  }, [dispatch, token]);

  const { requser} = useSelector((store) => store.auth);
  const { myrestaurant} = useSelector((store) => store.restaurant);

  

// console.log("my",myrestaurant)
  return (
    <div className="App">
     
      
        {requser ? (
          <Routes>
            <Route path="signup" element={<Navigate to="/"/>}  />
            <Route path="signin" element={<Navigate to="/"/>}  />
            <Route path="/*" element={ myrestaurant!==null?  <MainPage /> :<CreateRestaurantPage/>  }/> 
          </Routes>
        ) : (
          <Routes>
           <Route path="signup" element={<Signup />} />
              <Route path="signin" element={<Signin />} />
              {/* Redirect all other routes to the signin page */}
              <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        )}
     
    </div>
  );
}

export default App;
