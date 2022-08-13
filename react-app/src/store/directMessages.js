import moment from "moment";
import { fetchUser, fetchUserIfNotExist } from "./users";

const SET_DIRECT_MESSAGES = "messages/SET_DIRECT_MESSAGES";
const ADD_DIRECT_MESSAGE_CHAT = "messages/ADD_DIRECT_MESSAGE_CHAT";
const ADD_DIRECT_MESSAGE_TO_CHAT = "messages/ADD_DIRECT_MESSAGE_TO_CHAT";
const SORT_All_MESSAGES_BY_DATE = "messages/SORT_MESSAGES_BY_DATE";

// selectors
export const directMessageChatIdsSelector = (state) =>
  Object.keys(state.directMessages);
export const directMessageChatSelector = (chatId) => (state) =>
  state.directMessages[chatId];
export const directMessagesSelector = (chatId) => (state) =>
  state.directMessages[chatId]?.messages;
export const chatByUserId = (userId) => (state) =>
  Object.values(state.directMessages).find((chat) => chat.userId === userId);

// SET_DIRECT_MESSAGES action creator
export const setDirectMessages = (directMessages) => ({
  type: SET_DIRECT_MESSAGES,
  payload: directMessages,
});

// ADD_DIRECT_MESSAGE_TO_CHAT action creator
export const addDirectMessageToChat = (message) => ({
  type: ADD_DIRECT_MESSAGE_TO_CHAT,
  payload: message,
});

// SORT_MESSAGES_BY_DATE action creator
export const sortAllMessagesByDate = () => ({
  type: SORT_All_MESSAGES_BY_DATE,
});

// ADD_DIRECT_MESSAGE_CHAT action creator
export const addDirectMessageChat = (chat) => ({
  type: ADD_DIRECT_MESSAGE_CHAT,
  payload: chat,
});

export const fetchDirectMessages = () => async (dispatch) => {
  const response = await fetch("/api/direct-messages", {});
  const data = await response.json();

  if (response.ok) {
    await dispatch(setDirectMessages(data));

    // fetch the users who have chats
    Object.keys(data).forEach((userId) => dispatch(fetchUser(userId)));

    // sort the messages
    dispatch(sortAllMessagesByDate());
  }
  return data;
};

export const createDirectMessageChat = (userId) => async (dispatch) => {
  const response = await fetch("/api/direct-messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });

  const data = await response.json();
  if (response.ok) dispatch(addDirectMessageChat(data));
  return data;
};

export const deleteDirectMessageChat =
  (directMessageChatId) => async (dispatch) => {
    const response = await fetch(
      `/api/direct-messages/${directMessageChatId}`,
      {
        method: "DELETE",
      }
    );

    dispatch(fetchDirectMessages());

    const data = await response.json();
    return data;
  };

export const deleteDirectMessage = (directMessageId) => async (dispatch) => {
  const response = await fetch(
    `/api/direct-messages/messages/${directMessageId}`,
    {
      method: "DELETE",
    }
  );

  dispatch(fetchDirectMessages());

  const data = await response.json();
  return data;
};

export const sendDirectMessage =
  ({ recipientId, text, imageId }) =>
  async (dispatch) => {
    const response = await fetch(`/api/direct-messages/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient_id: recipientId,
        text: text,
        image_id: imageId,
      }),
    });

    const data = await response.json();

    if (response.ok) dispatch(addDirectMessageToChat(data));

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

    case ADD_DIRECT_MESSAGE_TO_CHAT:
      newState[payload.direct_message_chat_id].messages = [
        ...newState[payload.direct_message_chat_id].messages,
        payload,
      ];
      break;

    case SORT_All_MESSAGES_BY_DATE:
      const chats = Object.values(newState);
      chats.forEach((chat) => {
        chat.messages.sort((a, b) => moment(a.sent_at).diff(moment(b.sent_at)));
        // create copy of array to trigger state change
        chat.messages = [...chat.messages];
      });
      break;

    case ADD_DIRECT_MESSAGE_CHAT:
      newState[payload.id] = payload;
      break;

    default:
      break;
  }

  return newState;
}
