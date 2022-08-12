const SET_SERVER_MESSAGES = "messages/SET_SERVER_MESSAGES";

// selectors
export const serverMessagesSelector = (serverId) => (state) =>
  state.serverMessages[serverId];
export const serverChannelMessagesSelector = (serverId, channelId) => (state) => {
  const serverMessages = state.serverMessages[serverId];
  return serverMessages && serverMessages.filter((message) => message.channel_id === channelId);
};

// SET_SERVER_MESSAGES action creator
export const setServerMessages = (serverId, serverMessages) => ({
  type: SET_SERVER_MESSAGES,
  payload: {
    serverId,
    serverMessages,
  },
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

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case SET_SERVER_MESSAGES:
      newState[payload.serverId] = payload.serverMessages;
      break;

    default:
      break;
  }

  return newState;
}
