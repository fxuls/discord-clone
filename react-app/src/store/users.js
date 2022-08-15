import { getRandomColor } from "../styles";

export const SET_USERS = "users/SET_USERS";
export const SET_USER = "users/SET_USER";
export const REMOVE_USER = "users/REMOVE_USER";
export const SET_FRIENDS = "users/SET_FRIENDS";
export const SET_FRIEND_REQUESTS = "users/SET_FRIEND_REQUESTS";

// selector
export const userSelector = (userId) => (state) => state.users[userId];
export const friendsIdsSelector = (state) => state.users.friends;
export const friendsSelector = (state) =>
  state.users.friends?.map((friendId) => state.users[friendId]);
export const friendRequestsSelector = (state) => state.users.friendRequests;

// SET_USERS action creator
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

// SET_USER action creator
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// REMOVE_USER action creator
export const removeUser = (userId) => ({
  type: REMOVE_USER,
  payload: userId,
});

// SET_FRIENDS action creator
export const setFriends = (friendIds) => ({
  type: SET_FRIENDS,
  payload: friendIds,
});

// SET_FRIEND_REQUESTS action creator
export const setFriendRequests = (friendRequests) => ({
  type: SET_FRIEND_REQUESTS,
  payload: friendRequests,
});

// fetch user by id thunk
export const fetchUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {});

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
    return true;
  }

  return false;
};

// fetch if not in store thunk
export const fetchUserIfNotExist = (userId) => async (dispatch, getState) => {
  const state = getState();

  if (!state.users[userId]) {
    const data = await dispatch(fetchUser(userId));
    return data;
  }
}

// fetch users by ids thunk
export const fetchUsers = (userIds) => async (dispatch) => {
  for (let i = 0; i < userIds; i++) await dispatch(fetchUser(userIds[i]));
};

// fetch friends thunk
export const fetchFriends = () => async (dispatch) => {
  const response = await fetch("/api/users/friends");

  if (response.ok) {
    const friends = await response.json();
    const friendIds = friends.map((friend) => friend.id);

    dispatch(setUsers(friends));
    dispatch(setFriends(friendIds));
    return true;
  }

  return false;
};

// friend user by id thunk
export const friendUserById = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });

  if (response.ok) {
    dispatch(fetchFriendRequests());
    dispatch(fetchFriends());
  }

  const data = await response.json();
  return data;
};

// friend user by id thunk
export const friendUserByUsername = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
  });

  if (response.ok) {
    dispatch(fetchFriendRequests());
    dispatch(fetchFriends());
  }

  const data = await response.json();
  return data;
};

// unfriend user thunk
export const unfriendUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/friends`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(fetchFriendRequests());
    dispatch(fetchFriends());
  }

  const data = await response.json();
  return data;
};

// fetch friend requests thunk
export const fetchFriendRequests = () => async (dispatch) => {
  const response = await fetch("/api/users/friends/requests");

  if (response.ok) {
    const friendRequests = await response.json();

    // map to just userIds and fetch each user
    friendRequests.incoming = friendRequests.incoming.map(({ user_id }) => {
      dispatch(fetchUser(user_id));
      return user_id;
    });

    friendRequests.sent = friendRequests.sent.map(({ user_id }) => {
      dispatch(fetchUser(user_id));
      return user_id;
    });

    dispatch(setFriendRequests(friendRequests));
    return true;
  }

  return false;
};

const initialState = {
  friends: null,
  friendRequests: { incoming: [], send: [] },
};

export default function usersReducer(state = initialState, action) {
  const newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case SET_USERS:
      payload.forEach((user) => {
        // give user a random color if does not have one
        const currentColor = newState[user.id]?.color;
        user.color = currentColor ? currentColor : getRandomColor();
        newState[user.id] = user;
      });
      break;

    case SET_USER:
      const currentColor = newState[payload.id]?.color;
      newState[payload.id] = payload;

      // give user a random color if does not have
      newState[payload.id].color = currentColor ? currentColor : getRandomColor();
      break;

    case REMOVE_USER:
      delete newState[payload];
      break;

    case SET_FRIENDS:
      newState.friends = payload;
      break;

    case SET_FRIEND_REQUESTS:
      newState.friendRequests = payload;
      break;

    default:
      break;
  }

  return newState;
}
