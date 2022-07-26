import { IMAGE_MODAL } from "../components/modals/ImageModal";
import { CREATE_SERVER_MODAL } from "../components/modals/CreateServerModal";
import { ADD_CHANNEL_MODAL } from "../components/modals/AddChannelModal";

export const SET_SERVER = "ui/SHOW_SERVER";
export const CLEAR_SERVER = "ui/CLEAR_SERVER";
export const SET_DIRECT_MESSAGE_ID = "ui/SET_DIRECT_MESSAGE";
export const CLEAR_DIRECT_MESSAGE_ID = "ui/CLEAR_DIRECT_MESSAGE";
export const SET_FRIENDS_TAB = "ui/SET_FRIENDS_TAB";
export const SHOW_MODAL = "ui/SHOW_MODAL";
export const HIDE_MODAL = "ui/HIDE_MODAL";
export const SET_SERVER_CHANNEL_ID = "ui/SET_SERVER_CHANNEL_ID";

export const FRIENDS_TAB_ALL = "ui/FRIENDS_TAB_ALL";
export const FRIENDS_TAB_PENDING = "ui/FRIENDS_TAB_PENDING";
export const FRIENDS_TAB_ADD = "ui/FRIENDS_TAB_ADD";

// selectors
export const uiServerIdSelector = (state) => state.ui.serverId;
export const uiDirectMessageIdSelector = (state) => state.ui.directMessageId;
export const uiFriendsTabSelector = (state) => state.ui.friendsTab;
export const uiModalSelector = (state) => state.ui.modal;
export const uiServerChannelSelector = (serverId) => (state) =>
  state.ui.serverChannels[serverId];

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

// SHOW_MODAL action creator
export const showModal = (modal) => ({
  type: SHOW_MODAL,
  payload: modal,
});

// HIDE_MODAL action creator
export const hideModal = () => ({
  type: HIDE_MODAL,
});

// IMAGE_MODAL action creator
export const showImageModal = (imageUrl) => ({
  type: SHOW_MODAL,
  payload: {
    type: IMAGE_MODAL,
    imageUrl,
  },
});

// CREATE_SERVER_MODAL action creator
export const showCreateServerModal = () => ({
  type: SHOW_MODAL,
  payload: {
    type: CREATE_SERVER_MODAL,
  },
});

// ADD_CHANNEL_MODAL action creator
export const showAddChannelModal = (serverId) => ({
  type: SHOW_MODAL,
  payload: {
    type: ADD_CHANNEL_MODAL,
    serverId,
  },
})

// SET_SERVER_CHANNEL_ID action creator
export const setServerChannelId = (serverId, channelId) => ({
  type: SET_SERVER_CHANNEL_ID,
  payload: { serverId, channelId },
});

const initialState = {
  serverId: null,
  directMessageId: null,
  friendsTab: FRIENDS_TAB_ALL,
  modal: null,
  serverChannels: {},
};

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
      break;

    case SET_FRIENDS_TAB:
      newState.friendsTab = payload;
      break;

    case SHOW_MODAL:
      newState.modal = payload;
      break;

    case HIDE_MODAL:
      newState.modal = null;
      break;

    case SET_SERVER_CHANNEL_ID:
      newState.serverChannels[payload.serverId] = payload.channelId;
      break;

    default:
      break;
  }

  return newState;
}
