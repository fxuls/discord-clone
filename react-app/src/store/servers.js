const SET_SERVERS = "servers/SET_SERVERS";
const SET_SERVER = "servers/SET_SERVER";
const REMOVE_SERVER = "servers/REMOVE_SERVER";
const SET_JOINED_SERVERS = "servers/SET_JOINED_SERVERS";
const ADD_JOINED_SERVER = "servers/ADD_JOINED_SERVER";
const REMOVE_JOINED_SERVER = "servers/REMOVE_JOINED_SERVER";

// selectors
export const serverSelector = (serverId) => (state) => state.servers[serverId];

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

export const setJoinedServers = (servers) => ({
  type: SET_JOINED_SERVERS,
  payload: servers,
});

export const addJoinedServer = (serverId) => ({
  type: ADD_JOINED_SERVER,
  payload: serverId,
});

export const removeJoinedServer = (serverId) => ({
  type: REMOVE_JOINED_SERVER,
  payload: serverId,
});

// fetch all servers
export const fetchAllServers = () => async (dispatch) => {
  const response = await fetch("/api/servers", {});

  if (response.ok) {
    const data = await response.json();
    dispatch(setServers(data));
  }
};

// fetch server by id thunk
export const fetchServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setServer(data));
    return true;
  } else return false;
};

export const fetchJoinedServers = () => async (dispatch) => {
  const response = await fetch("/api/servers/joined", {});

  if (response.ok) {
    const data = await response.json();
    dispatch(setJoinedServers(data));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case SET_SERVERS:
      for (const server in payload) newState[server.id] = server;
      break;

    case SET_SERVER:
      newState[payload.id] = payload;
      break;

    case REMOVE_SERVER:
      delete newState[payload];
      break;

    default:
      break;
  }

  return newState;
}
