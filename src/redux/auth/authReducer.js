import { LOG_OUT, REQ_USER, SIGN_IN, SIGN_UP } from "./authActionType"

const initialValues = {

    signup: null,
    signin: null,
    requser: null,




}

export const authReducer = (store = initialValues, action) => {

    if (action.type === SIGN_IN) {

        return { ...store, signin: action.payload }
    } else if (action.type === SIGN_UP) {

        return { ...store, signup: action.payload }
    } else if (action.type === REQ_USER) {

        return { ...store, requser: action.payload }
    }
    else if (action.type === LOG_OUT) {

        return {
            ...store,
            signup: null,
            signin: null,
            requser: null,

        };
    }


    return store;

}