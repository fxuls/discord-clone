const SET_SERVERS = "servers/SET_SERVERS";
const SET_SERVER = "servers/SET_SERVER";
const REMOVE_SERVER = "servers/REMOVE_SERVER";
const SET_JOINED_SERVERS = "servers/SET_JOINED_SERVERS";
const SET_SERVER_CHANNELS = "servers/SET_SERVER_CHANNELS";

// selectors
export const serverSelector = (serverId) => (state) => state.servers[serverId];
export const joinedServersIdsSelector = (state) =>
  Object.keys(state.servers.joined);
export const joinedServersSelector = (state) =>
  Object.keys(state.servers.joined).map((id) => state.servers[id]);
export const serverChannelsSelector = (serverId) => (state) => state.servers[serverId]?.channels

// action creators
export const setServers = (servers) => ({
  type: SET_SERVERS,
  payload: servers,
});

export const setServer = (server) => ({
  type: SET_SERVER,
  payload: server,
});

export const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  payload: serverId,
});

export const setJoinedServers = (serverMemberships) => ({
  type: SET_JOINED_SERVERS,
  payload: serverMemberships,
});

export const setServerChannels = (serverId, channels) => ({
  type: SET_SERVER_CHANNELS,
  payload: {
    serverId,
    channels,
  },
});

// fetch all servers
export const fetchAllServers = () => async (dispatch) => {
  const response = await fetch("/api/servers", {});

  if (response.ok) {
    const data = await response.json();
    dispatch(setServers(data));
    return true;
  }

  return null;
};

// fetch server by id thunk
export const fetchServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {});

  if (response.ok) {
    const data = await response.json();
    dispatch(setServer(data));
    return true;
  }

  return false;
};

// fetch servers by array of ids
export const fetchServers = (serverIds) => async (dispatch) => {
  for (let i = 0; i < serverIds.length; i++)
    await dispatch(fetchServer(serverIds[i]));
};

// fetch joined servers thunk
export const fetchJoinedServers = () => async (dispatch) => {
  const response = await fetch("/api/servers/joined", {});

  if (response.ok) {
    const data = await response.json();

    const joinedServers = {};
    data.forEach((server) => {
      const permission = {
        permission: server.permission.permission,
        name: server.permission.name,
      };
      joinedServers[server.server_id] = { permission };
    });

    await dispatch(setJoinedServers(joinedServers));
    await dispatch(fetchServers(Object.keys(joinedServers)));
  }
};

// join server by id thunk
export const joinServerById = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/memberships`, {
    method: "POST",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(fetchJoinedServers());
    return data;
  }

  return null;
};

// join server by url thunk
export const joinServerByUrl = (serverUrl) => async (dispatch) => {
  // extract last path of url
  const path = serverUrl.split("/").pop();

  const response = await fetch(`/api/servers/join/${path}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(fetchJoinedServers());
    return data;
  }

  return null;
};

// leave server thunk
export const leaveServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/memberships`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(fetchJoinedServers());
    return data;
  }

  return null;
};

// fetch server channels thunk
export const fetchServerChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`, {});

  const data = await response.json();

  if (response.ok) {
    dispatch(setServerChannels(serverId, data));
  }

  return data;
}

const initialState = { joined: {} };

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case SET_SERVERS:
      payload.forEach((server) => (newState[server.id] = server));
      break;

    case SET_SERVER:
      newState[payload.id] = payload;
      break;

    case REMOVE_SERVER:
      delete newState[payload];
      break;

    case SET_JOINED_SERVERS:
      newState.joined = payload;
      break;

    case SET_SERVER_CHANNELS:
      newState[payload.serverId].channels = payload.channels;
      break;

    default:
      break;
  }

  return newState;
}
