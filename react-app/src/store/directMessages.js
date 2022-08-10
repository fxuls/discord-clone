const SET_DIRECT_MESSAGES = "messages/SET_DIRECT_MESSAGES";

// selectors

// SET_DIRECT_MESSAGES action creator
export const setDirectMessages = (messages) => ({
    type: SET_DIRECT_MESSAGES,
    payload: messages,
});
