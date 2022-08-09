export const SET_USERS = "users/SET_USERS";
export const SET_USER = "users/SET_USER";
export const REMOVE_USER = "users/REMOVE_USER";
export const SET_FRIENDS = "users/SET_FRIENDS";

// selector
export const userSelector = (userId) => (state) => state.users[userId];
export const friendsIdsSelector = (state) => state.users.friends;
export const friendsSelector = (state) =>
  state.users.friends.map((friendId) => state.users[friendId]);

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

// fetch user by id thunk
export const fetchUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {});

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return true;
  }

  return false;
};

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

const initialState = { friends: null };

export default function usersReducer(state = initialState, action) {
  const newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case SET_USERS:
      payload.forEach((user) => (newState[user.id] = user));
      break;

    case SET_USER:
      newState[payload.id] = payload;
      break;

    case REMOVE_USER:
      delete newState[payload];
      break;

    case SET_FRIENDS:
      newState.friends = payload;

    default:
      break;
  }

  return newState;
}
