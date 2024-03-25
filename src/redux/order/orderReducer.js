import { GET_ALL_ORDERS, UPDATE_ORDER } from "./orderActionType";

const initialValues = {

    orders:[],
    updatedorder:null,
    
  }
  
  export const orderReducer = (store = initialValues, action) => {
  
      if (action.type ===GET_ALL_ORDERS) {
  
          return { ...store,orders: action.payload }
      } else if (action.type ===UPDATE_ORDER ){
  
          return { ...store,updatedorder:action.payload }
      } 
      
  
      return store;
  
  }