export const SET_USERS = "users/SET_USERS";
export const SET_USER = "users/SET_USER";
export const REMOVE_USER = "users/REMOVE_USER";

// selector

// SET_USERS action creator
export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users,
});

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

// fetch user by id thunk
export const fetchUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {});

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        return true;
    }

    return false;
}

const initialState = { friends: null };

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
