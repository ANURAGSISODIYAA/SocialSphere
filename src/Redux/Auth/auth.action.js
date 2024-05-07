import axios from "axios";
import { GET_PROFILE_Failure, GET_PROFILE_Request, GET_PROFILE_Success, Login_Failure, Login_Request, Login_Success, Register_Failure, Register_Request, Register_Success, SEARCH_USER_Failure, SEARCH_USER_Request, SEARCH_USER_Success, UPDATE_PROFILE_Failure, UPDATE_PROFILE_Request, UPDATE_PROFILE_Success } from "./auth.actionType";
import { API_BASE_URL, api } from "../../Config/api";


export const userLoginAction = (loginData) => async (dispatch) => {
    dispatch({ type: Login_Request })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

        if (data.token) {
          //  console.log("if calling");
            localStorage.setItem("jwt", data.token)
        }
        console.log("Login Sucess  " , data);
        dispatch({ type: Login_Success, payload: data.jwt })

    } catch (error) {
        console.log("-------> " , error);
        dispatch({ type: Login_Failure, payload: error })
    }
}


export const userRegisterAction = (loginData) => async (dispatch) => {
    dispatch({ type: Register_Request })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data);

        if (data.token) {
           // console.log("jwt");
            localStorage.setItem("jwt", data.token)
        }
        console.log("Registered" + data);
        dispatch({ type: Register_Success, payload: data.jwt})

    } catch (error) {
        console.log("-------> " + error);
        dispatch({ type: Register_Failure, payload: error })
    }
}


export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_Request })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/user/profile`,
            {
             headers : {
             "Authorization":`Bearer ${jwt}`
              }
            }
         );

        console.log("user profile ------" + data);
        dispatch({ type: GET_PROFILE_Success, payload: data})

    } catch (error) {
        console.log("-------> " + error);
        dispatch({ type: GET_PROFILE_Failure, payload: error })
    }
}


export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_Request})
    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users`,reqData
         );

        console.log("user profile Update ------" , data);
        dispatch({ type: UPDATE_PROFILE_Success, payload: data})

    } catch (error) {
        console.log("eroor in upadte useer-------> " ,error);
        dispatch({ type: UPDATE_PROFILE_Failure, payload: error })
    }
}


export const searchUserAction = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_Request });
    try {

        const { data } = await api.get(`/api/user/search?query=${query}`);

        console.log("search user ------" , data);
        dispatch({ type:SEARCH_USER_Success, payload: data});

    } catch (error) {
        console.log("error-------> " ,error);
        dispatch({ type: SEARCH_USER_Failure, payload: error });
    }
}






