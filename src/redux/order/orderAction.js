import { GET_ALL_ORDERS, UPDATE_ORDER } from "./orderActionType";

export const getAllOrders = (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/admin/orders/restaurant/${data.restaurantId}`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                }

            }
        );


        const response = await res.json();

    


        dispatch({ type: GET_ALL_ORDERS, payload: response })



    } catch (error) {

        console.log(error)
    }
}

export const updateOrder = (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/admin/orders/update`,

            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                body: JSON.stringify(data.data)

            }
        );


        const response = await res.json();

    

        if(res.status===200){

            dispatch({ type: UPDATE_ORDER, payload: response })
        }else{
            dispatch({ type: UPDATE_ORDER, payload: null })

        }

        return response;



    } catch (error) {

        console.log(error)
    }
}