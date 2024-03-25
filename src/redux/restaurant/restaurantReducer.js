import { CREATE_RESTAURANT, GET_MY_RESTAURANT, GET_RESTAURANT_BY_ID, UPDATE_RESTAURANT_STATUS } from "./restaurantActionType"


const initialValues = {

   myrestaurant:null,
   restaurantbyid:null,
  

}

export const restaurantReducer = (store = initialValues, action) => {

    if (action.type === GET_MY_RESTAURANT) {

        return { ...store,myrestaurant: action.payload }
    } else if (action.type ===GET_RESTAURANT_BY_ID) {

        return { ...store,restaurantbyid :action.payload }
    } else if (action.type ===CREATE_RESTAURANT) {

        return { ...store,myrestaurant :action.payload }
        
    } else if (action.type ===UPDATE_RESTAURANT_STATUS) {

        return { ...store,myrestaurant :action.payload }
    } 



    return store;

}