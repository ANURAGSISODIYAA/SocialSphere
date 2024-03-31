import { Login_Failure, Login_Request, Login_Success, Register_Failure, Register_Request, Register_Success } from "./auth.actionType";

const initalState = {
    jwt: null,
    error:null,
    loading:false
}

export const authReducer = (state = initalState, action) => {

    switch (action.type) {
        case Login_Request:
        case Register_Request:

            return { ...state, loading: true, error: null }

        case Login_Success:
        case Register_Success:

             return { ...state, jwt:action.payload, loading:false, error:null}

        case Login_Failure:
        case Register_Failure:

            return { ...state, loading:false, error:action.payload}
        default:
            return state;
    }
}