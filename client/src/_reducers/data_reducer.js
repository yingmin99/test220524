import { FETCH_DATA } from "../_actions/types";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, fetchSuccess: action.payload }
        default:
            return state;
    }
}

export default reducer;