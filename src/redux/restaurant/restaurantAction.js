import { CREATE_RESTAURANT, GET_MY_RESTAURANT, GET_RESTAURANT_BY_ID, UPDATE_RESTAURANT_STATUS } from "./restaurantActionType";

export const getMyRestaurantAction = (token) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/admin/restaurants/user`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }

            }
        );

        const statusCode = res.status;


        const response = await res.json();


        if(statusCode===200){

            dispatch({ type: GET_MY_RESTAURANT, payload: response })
        }else{
            console.log(response)
            dispatch({ type: GET_MY_RESTAURANT, payload: null})


        }

        






    } catch (error) {

        console.log(error)
    }
}


export const getRestaurantByIdAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/restaurants/id/${data.restaurantId}`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                }

            }
        );


        const response = await res.json();

   
        

        dispatch({ type: GET_RESTAURANT_BY_ID, payload: response })



    } catch (error) {

        console.log(error)
    }
}


export const createRestaurantAction = (data) => async (dispatch) => {


    try {

        const res = await fetch(
            "http://localhost:8080/api/admin/restaurants/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                body: JSON.stringify(data.data)

            }
        );


        const resp = await res.json();

            // console.log(resp)
        if(res.status===201){
            dispatch({ type: CREATE_RESTAURANT, payload: resp})
        }else{
           
            dispatch({ type: CREATE_RESTAURANT, payload: null})
        }
        
        return res.status===201;
       
        



    } catch (error) {

        console.log(error)
        dispatch({ type: CREATE_RESTAURANT, payload: null})

        return false;
    }
}


export const updateRestaurantStatusAction = (data) => async (dispatch) => {


    try {

        const res = await fetch(
            `http://localhost:8080/api/admin/restaurants/status/${data.restaurantId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                

            }
        );


        const resp = await res.json();

            // console.log(resp)
        if(res.status===200){
            dispatch({ type: UPDATE_RESTAURANT_STATUS, payload: resp})
        }
        
        return res.status===200;
       
        



    } catch (error) {

        console.log(error)
        

        return false;
    }
}
