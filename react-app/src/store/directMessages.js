import { fetchUser } from "./users";

const SET_DIRECT_MESSAGES = "messages/SET_DIRECT_MESSAGES";

// selectors

// SET_DIRECT_MESSAGES action creator
export const setDirectMessages = (directMessages) => ({
  type: SET_DIRECT_MESSAGES,
  payload: directMessages,
});

export const fetchDirectMessages = () => async (dispatch) => {
  const response = await fetch("/api/direct-messages", {});

  if (response.ok) {
    const directMessages = await response.json();

    dispatch(setDirectMessages(directMessages));

    // fetch the users who have chats
    Object.keys(directMessages).forEach((userId) =>
      dispatch(fetchUser(userId))
    );
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case SET_DIRECT_MESSAGES:
      newState = payload;
      break;

    default:
      break;
  }

  return newState;
}
