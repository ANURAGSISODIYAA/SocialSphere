import axios from "axios";
import { Login_Request, Register_Request } from "./auth.actionType";
import { API_BASE_URL } from "../../Config/api";

export const userLoginAction = (loginData) => async (dispatch) => {
    dispatch({ type: Login_Request })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

        if (data.jwt) {
           
            localStorage.setItem("jwt", data.jwt)
        }
        console.log("Login Sucess" + data);
        dispatch({ type: Login_Request, payload: data.jwt })

    } catch (error) {
        console.log("-------> " + error);
        dispatch({ type: Login_Request, payload: error })
    }
}

export const userRegisterAction = (loginData) => async (dispatch) => {
    dispatch({ type: Register_Request })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data);

        if (data.jwt) {
            console.log("jwt");
            localStorage.setItem("token", data.jwt)
        }
        console.log("Registered" + data);
        dispatch({ type: Register_Request, payload: data.jwt})

    } catch (error) {
        console.log("-------> " + error);
        dispatch({ type: Register_Request, payload: error })
    }
}