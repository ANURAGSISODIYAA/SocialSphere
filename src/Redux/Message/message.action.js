import { api } from "../../Config/api"
import { CREATE_CHAT_FAILURE, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_ALL_CHATS_FAILURE, GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_SUCCESS } from "./message.actionType"

export const createMessage = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_MESSAGE_REQUEST })
    console.log("reqData--> ", reqData)


    try {
          // Ensure reqData.message contains the expected properties
          console.log("Message content:", reqData.message);
        const { data } = await api.post(`/api/message/chat/${reqData.message.chatId}`, reqData.message);
        console.log("Created message:", data);
        reqData.sendMessageToServer(data);
       

        dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data })
    } catch (error) {
        console.log("errorr ----->", error);
        dispatch({ type: CREATE_MESSAGE_FAILURE, payload: error })

    }

}

export const createChat = (chat) => async (dispatch) => {
    dispatch({ type: CREATE_CHAT_REQUEST })

    try {
        const { data } = await api.post(`/api/chats`, chat)

        console.log("created chat ", data)

        dispatch({ type: CREATE_CHAT_SUCCESS, payload: data })
    } catch (error) {
        console.log("errorr ----->", error);
        dispatch({ type: CREATE_CHAT_FAILURE, payload: error })

    }

}


export const getAllChat = () => async (dispatch) => {
    dispatch({ type: GET_ALL_CHATS_REQUEST })

    try {
        const { data } = await api.get(`/api/chats`)

        console.log("all chat ", data)

        dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: data })
    } catch (error) {

        console.log("errorr ----->", error);
        
        dispatch({ type: GET_ALL_CHATS_FAILURE, payload: error })

    }

}