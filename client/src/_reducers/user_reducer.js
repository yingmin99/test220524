import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    NAVER_LOGIN_USER,
    FIND_USER,
    GENERATE_TOKEN,
    IS_EMAIL_SENT,
    DELETE_TOKEN,
    RESET_PASSWORD,
} from "../_actions/types";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case NAVER_LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case FIND_USER:
            return { ...state, findSuccess: action.payload }
        case GENERATE_TOKEN:
            return { ...state, generateSuccess: action.payload }
        case IS_EMAIL_SENT:
            return { ...state, sendSuccess: action.payload }
        case DELETE_TOKEN:
            return { ...state, deleteSuccess: action.payload }
        case RESET_PASSWORD:
            return { ...state, resetSuccess: action.payload }
        default:
            return state;
    }
}

export default reducer;