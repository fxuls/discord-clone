export const SET_SERVER = "ui/SHOW_SERVER";
export const CLEAR_SERVER = "ui/CLEAR_SERVER";
export const SET_DIRECT_MESSAGE_ID = "ui/SET_DIRECT_MESSAGE";
export const CLEAR_DIRECT_MESSAGE_ID = "ui/CLEAR_DIRECT_MESSAGE";

// selectors
export const uiServerIdSelector = (state) => state.ui.serverId;
export const uiDirectMessageIdSelector = (state) => state.ui.directMessageId;

// SET_SERVER action creator
export const setServer = (serverId) => ({
    type: SET_SERVER,
    payload: serverId,
});

// CLEAR_SERVER action creator
export const clearServer = () => ({
    type: CLEAR_SERVER,
});

// SET_DIRECT_MESSAGE_ID action creator
export const setDirectMessageId = (directMessageId) => ({
    type: SET_DIRECT_MESSAGE_ID,
    payload: directMessageId,
});

// CLEAR_DIRECT_MESSAGE_ID action creator
export const clearDirectMessageId = () => ({
    type: CLEAR_DIRECT_MESSAGE_ID,
});

const initialState = { serverId: null, directMessageId: null };

export default function uiReducer(state = initialState, action) {
    const newState = { ...state };

    switch (action.type) {
        case SET_SERVER:
            newState.serverId = action.payload;
            break;

        case CLEAR_SERVER:
            newState.serverId = null;
            break;

        case SET_DIRECT_MESSAGE_ID:
            newState.directMessageId = action.payload;
            break;

        case CLEAR_DIRECT_MESSAGE_ID:
            newState.directMessageId = null;

        default:
            break;
    }

    return newState;
}
