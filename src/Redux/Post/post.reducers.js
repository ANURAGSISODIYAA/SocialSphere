import { CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./post.actionType";

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null,
    comments: [],
    newComment:null
}

export const postReducers = (state = initialState, action) => {

    switch (action.type) {

        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case GET_USERS_POST_REQUEST:
        case LIKE_POST_REQUEST:
            return { ...state, error: null, loading: false }

        case CREATE_POST_SUCCESS:
            return {
                ...state, post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null
            }

        case CREATE_COMMENT_SUCCESS:
            return {
                 ...state,
                // comments:[action.payload, ...state.comments],
                 loading: false,
                 error: null,
                 newComment:action.payload
            }

        case GET_ALL_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null,
                comments: action.payload.comments
            }

            case LIKE_POST_SUCCESS:
                const updatedPosts = state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            likes: action.payload.likes // Assuming 'likes' is the key for likes count
                        };
                    }
                    return post;
                });
            
                return {
                    ...state,
                    posts: updatedPosts,
                    loading: false,
                    error: null
                };
            

        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case GET_USERS_POST_FAILURE:
        case LIKE_POST_FAILURE:


            return { ...state, error: action.payload, loading: false }

        default:
            return state;
    }
}