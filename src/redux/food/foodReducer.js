import { CREATE_CATEGORY, CREATE_FOOD, GET_ALL_CATEGORIES, GET_ALL_FOODS, GET_FOOD_BY_CATEGORY, UPDATE_FOOD } from "./foodActionType"

const initialValues = {

   foods:[],
   categories:[],
   createdfood:null,
   createdcategory:null,
   foodbycategory:[],
    updatedfood:null
 }
 
 export const foodReducer = (store = initialValues, action) => {
 
     if (action.type ===GET_ALL_CATEGORIES) {
 
         return { ...store,categories: action.payload }
     } else if (action.type ===CREATE_CATEGORY ){
 
         return { ...store,createdcategory:action.payload }
     } 
     else if (action.type ===CREATE_FOOD) {
 
         return { ...store,createdfood :action.payload }
     } else if (action.type ===GET_ALL_FOODS) {
 
        return { ...store,foods :action.payload }

    } else if (action.type ===UPDATE_FOOD) {
 
        return { ...store,updatedfood :action.payload }
        
    } else if (action.type ===GET_FOOD_BY_CATEGORY) {
 
        return { ...store,foodbycategory :action.payload }
    } 
 
 
 
     return store;
 
 }