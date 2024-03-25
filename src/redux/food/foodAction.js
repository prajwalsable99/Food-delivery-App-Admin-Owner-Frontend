import { CREATE_CATEGORY, CREATE_FOOD, GET_ALL_CATEGORIES, GET_ALL_FOODS, GET_FOOD_BY_CATEGORY, UPDATE_FOOD } from "./foodActionType";

export const createCategoryAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/admin/category/create`,

            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                

                body: JSON.stringify(data.data)

            }
        );


        const response = await res.json();

    


        dispatch({ type: CREATE_CATEGORY, payload: response })

        return res.status===201;



    } catch (error) {

        console.log(error)
    }
}




export const getAllCategoriesAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/admin/category/all/${data.restaurantId}`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                }

            }
        );


        const response = await res.json();

    


        dispatch({ type: GET_ALL_CATEGORIES, payload: response })



    } catch (error) {

        console.log(error)
    }
}


export const createFoodAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/admin/food/create`,

            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                

                body: JSON.stringify(data.data)

            }
        );


        const response = await res.json();

    


        dispatch({ type: CREATE_FOOD, payload: response })

        return res.status===201;



    } catch (error) {

        console.log(error)
    }
}


export const getAllFood= (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/food/restaurant/all/${data.restaurantId}?isveg=${data.isveg}&isseasonal=${data.isseasonal}&isnonveg=${data.isnonveg}`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                }

            }
        );


        const response = await res.json();
            // console.log(response)
    


        dispatch({ type: GET_ALL_FOODS, payload: response })



    } catch (error) {

        console.log(error)
    }
}


export const updateFoodAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/admin/food/available/${data.foodId}`,

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

    


        dispatch({ type: UPDATE_FOOD, payload: response })

        return res.status===200;



    } catch (error) {

        console.log(error)
    }
}

export const getFoodByCategory = (data) => async (dispatch) => {
    try {

        const res = await fetch(
            `http://localhost:8080/api/food/restaurant/${data.restaurantId}/food/category/${data.categoryName}`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                }

            }
        );


        const response = await res.json();

    


        dispatch({ type: GET_FOOD_BY_CATEGORY, payload: response })



    } catch (error) {

        console.log(error)
    }
}