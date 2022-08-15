const SET_SERVER_MESSAGES = "messages/SET_SERVER_MESSAGES";
const ADD_SERVER_MESSAGE = "messages/ADD_SERVER_MESSAGE";

// selectors
export const serverMessagesSelector = (serverId) => (state) =>
  state.serverMessages[serverId];
export const serverChannelMessagesSelector =
  (serverId, channelId) => (state) => {
    const serverMessages = state.serverMessages[serverId];
    return (
      serverMessages &&
      serverMessages.filter((message) => message.channel_id === channelId)
    );
  };

// SET_SERVER_MESSAGES action creator
export const setServerMessages = (serverId, serverMessages) => ({
  type: SET_SERVER_MESSAGES,
  payload: {
    serverId,
    serverMessages,
  },
});

// ADD_SERVER_MESSAGE action creator
export const addServerMessage = (message) => ({
  type: ADD_SERVER_MESSAGE,
  payload: message,
});

// fetch server messages thunk
export const fetchServerMessages = (serverId) => async (dispatch) => {
  const response = await fetch(
    `/api/server-messages/servers/${serverId}/messages`,
    {}
  );

  const data = await response.json();
  if (response.ok) dispatch(setServerMessages(serverId, data));
  return data;
};

// send server message thunk
export const sendServerMessage =
  ({ serverId, channelId, text, imageId }) =>
  async (dispatch) => {
    const response = await fetch(
      `/api/server-messages/servers/${serverId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel_id: channelId,
          text: text,
          image_id: imageId,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) dispatch(addServerMessage(data));

    return data;
  };

// delete server message thunk
export const deleteServerMessage =
  (serverId, messageId) => async (dispatch) => {
    const response = await fetch(`/api/server-messages/messages/${messageId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) dispatch(fetchServerMessages(serverId));
    return data;
  };

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case SET_SERVER_MESSAGES:
      newState[payload.serverId] = payload.serverMessages;
      break;

    case ADD_SERVER_MESSAGE:
      newState[payload.server_id] = [
        ...newState[payload.server_id],
        payload,
      ];
      break;

    default:
      break;
  }

  return newState;
}
