export const SET_SERVER = "ui/SHOW_SERVER";
export const CLEAR_SERVER = "ui/CLEAR_SERVER";
export const SET_DIRECT_MESSAGE_ID = "ui/SET_DIRECT_MESSAGE";
export const CLEAR_DIRECT_MESSAGE_ID = "ui/CLEAR_DIRECT_MESSAGE";
export const SET_FRIENDS_TAB = "ui/SET_FRIENDS_TAB";

export const FRIENDS_TAB_ALL = "ui/FRIENDS_TAB_ALL";
export const FRIENDS_TAB_PENDING = "ui/FRIENDS_TAB_PENDING";
export const FRIENDS_TAB_ADD = "ui/FRIENDS_TAB_ADD";

// selectors
export const uiServerIdSelector = (state) => state.ui.serverId;
export const uiDirectMessageIdSelector = (state) => state.ui.directMessageId;
export const uiFriendsTabSelector = (state) => state.ui.friendsTab;

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

// SET_FRIENDS_TAB action creator
export const setFriendsTab = (tab) => ({
    type: SET_FRIENDS_TAB,
    payload: tab,
});

const initialState = { serverId: null, directMessageId: null, friendsTab: FRIENDS_TAB_ALL };

export default function uiReducer(state = initialState, action) {
    const newState = { ...state };
    const payload = action.payload;

    switch (action.type) {
        case SET_SERVER:
            newState.serverId = payload;
            break;

        case CLEAR_SERVER:
            newState.serverId = null;
            break;

        case SET_DIRECT_MESSAGE_ID:
            newState.directMessageId = payload;
            break;

        case CLEAR_DIRECT_MESSAGE_ID:
            newState.directMessageId = null;

        case SET_FRIENDS_TAB:
            newState.friendsTab = payload;

        default:
            break;
    }

    return newState;
}
