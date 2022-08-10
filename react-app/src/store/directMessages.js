import { fetchUser } from "./users";

const SET_DIRECT_MESSAGES = "messages/SET_DIRECT_MESSAGES";

// selectors
export const directMessageChatIdsSelector = (state) =>
  Object.keys(state.directMessages);
export const directMessageChatSelector = (chatId) => (state) => state.directMessages[chatId];

// SET_DIRECT_MESSAGES action creator
export const setDirectMessages = (directMessages) => ({
  type: SET_DIRECT_MESSAGES,
  payload: directMessages,
});

export const fetchDirectMessages = () => async (dispatch) => {
  const response = await fetch("/api/direct-messages", {});
  const data = await response.json();

  if (response.ok) {
    dispatch(setDirectMessages(data));

    // fetch the users who have chats
    Object.keys(data).forEach((userId) =>
      dispatch(fetchUser(userId))
    );
  }
  return data;
};

export const deleteDirectMessageChat =
  (directMessageChatId) => async (dispatch) => {
    const response = await fetch(`/api/direct-messages/${directMessageChatId}`, {
      method: "DELETE",
    });

    dispatch(fetchDirectMessages());

    const data = await response.json();
    return data;
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
