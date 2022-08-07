export const SET_USER = "users/SET_USER";
export const REMOVE_USER = "users/REMOVE_USER";

// selector


// SET_USER action creator
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

// REMOVE_USER action creator
export const removeUser = (userId) => ({
    type: REMOVE_USER,
    payload: userId,
});

const initialState = {};

export default function usersReducer(state = initialState, action) {
    const newState = { ...state };
    const payload = action.payload;

    switch (action.type) {
        case SET_USER:
            newState[payload.id] = payload;
            break;

        case REMOVE_USER:
            delete newState[payload];
            break;

        default:
            break;
    }

    return newState;
}
