import { GET_PROFILE_Request, GET_PROFILE_Success, Login_Failure, Login_Request, Login_Success, Register_Failure, Register_Request, Register_Success, SEARCH_USER_Success, UPDATE_PROFILE_Failure, UPDATE_PROFILE_Request, UPDATE_PROFILE_Success } from "./auth.actionType";

const initalState = {
    jwt: null,
    error: null,
    loading: false,
    user: null,
    searchUser: []
}

export const authReducer = (state = initalState, action) => {

    switch (action.type) {
        case Login_Request:
        case Register_Request:
        case GET_PROFILE_Request:
        case UPDATE_PROFILE_Request:
            return { ...state, loading: true, error: null }

        case GET_PROFILE_Success:
        case UPDATE_PROFILE_Success:
            return { ...state, user: action.payload, error: null, loading: false }

        case Login_Success:
        case Register_Success:
            return { ...state, jwt: action.payload, loading: false, error: null }

        case SEARCH_USER_Success:
            return {...state ,searchUser:action.payload,loading:false , error:null}

        case Login_Failure:
        case Register_Failure:
        case UPDATE_PROFILE_Failure:
            return { ...state, loading: false, error: action.payload }

        default:
            return state;
    }
}