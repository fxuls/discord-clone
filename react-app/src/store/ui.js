export const SET_SERVER = "ui/SHOW_SERVER";
export const CLEAR_SERVER = "ui/CLEAR_SERVER";

// selectors
export const uiServerIdSelector = (state) => state.ui.serverId;

// SET_SERVER action creator
export const setServer = (serverId) => ({
    type: SET_SERVER,
    payload: serverId,
});

// CLEAR_SERVER action creator
export const clearServer = () => ({
    type: CLEAR_SERVER,
});

const initialState = { serverId: null };

export default function uiReducer(state = initialState, action) {
    const newState = { ...state };

    switch (action.type) {
        case SET_SERVER:
            newState.serverId = action.payload;
            break;

        case CLEAR_SERVER:
            newState.serverId = null;
            break;

        default:
            break;
    }

    return newState;
}
