import moment from "moment";
import { fetchUser } from "./users";

const SET_DIRECT_MESSAGES = "messages/SET_DIRECT_MESSAGES";
const SET_DIRECT_CHAT = "messages/SET_DIRECT_CHAT";
const ADD_DIRECT_MESSAGE_CHAT = "messages/ADD_DIRECT_MESSAGE_CHAT";
const ADD_DIRECT_MESSAGE_TO_CHAT = "messages/ADD_DIRECT_MESSAGE_TO_CHAT";
const SORT_All_MESSAGES_BY_DATE = "messages/SORT_MESSAGES_BY_DATE";
const REMOVE_DIRECT_MESSAGE_CHAT = "messages/REMOVE_DIRECT_MESSAGE_CHAT";

// selectors
export const allDirectMessagesSelector = (state) => state.directMessages;
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

// SET_DIRECT_CHAT_MESSAGES action creator
export const setDirectChat = (chat) => ({
  type: SET_DIRECT_CHAT,
  payload: chat,
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

// REMOVE_DIRECT_MESSAGE_CHAT action creator
export const removeDirectMessageChat = (chatId) => ({
  type: REMOVE_DIRECT_MESSAGE_CHAT,
  payload: chatId,
});

export const fetchDirectMessages = () => async (dispatch) => {
  const response = await fetch("/api/direct-messages", {});
  const data = await response.json();

  if (response.ok) {
    await dispatch(setDirectMessages(data));

    // fetch the users who have chats
    Object.values(data).forEach(({ userId }) => dispatch(fetchUser(userId)));

    // sort the messages
    dispatch(sortAllMessagesByDate());
  }
  return data;
};

export const fetchDirectChat = (chatId) => async (dispatch) => {
  const response = await fetch(`/api/direct-messages/${chatId}`);

  const data = await response.json();
  if (response.ok) {
    await dispatch(setDirectChat(data));
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
  if (response.ok) {
    dispatch(addDirectMessageChat(data));
  }
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

    if (response.ok) {
      await dispatch(removeDirectMessageChat(directMessageChatId));
    }

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

    if (response.ok) dispatch(fetchDirectChat(data.direct_message_chat_id));

    return data;
  };

export const editDirectMessage = ({ messageId, text, imageId}) => async (dispatch) => {
  const response = await fetch(`/api/direct-messages/messages/${messageId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      image_id: imageId,
    }),
  });

  const data = await response.json();
  if (response.ok) await dispatch(fetchDirectChat(data.direct_message_chat_id));
  return data;
}

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

    case SET_DIRECT_CHAT:
      newState[payload.id] = payload;
      break;

    case REMOVE_DIRECT_MESSAGE_CHAT:
      delete newState[payload];
      break;

    default:
      break;
  }

  return newState;
}
