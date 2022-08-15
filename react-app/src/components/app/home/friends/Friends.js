import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  friendsSelector,
  friendRequestsSelector,
} from "../../../../store/users";
import {
  uiFriendsTabSelector,
  FRIENDS_TAB_ALL,
  FRIENDS_TAB_PENDING,
  FRIENDS_TAB_ADD,
} from "../../../../store/ui";

import FriendHeader from "./FriendHeader";
import FriendsList from "./FriendsList";
import PendingFriendsList from "./PendingFriendsList";
import AddFriend from "./AddFriend";

const Friends = ({ loaded }) => {
  const friends = useSelector(friendsSelector);
  const friendRequests = useSelector(friendRequestsSelector);
  const tab = useSelector(uiFriendsTabSelector);

  // reload on state change
  useEffect(() => {}, [friends, friendRequests, tab]);

  if (!loaded) return null;

  return (
    <div className="friends-container main left-inset-shadow">
      <FriendHeader />
        {tab === FRIENDS_TAB_ALL && <FriendsList friends={friends} />}
        {tab === FRIENDS_TAB_PENDING && <PendingFriendsList friendRequests={friendRequests} />}
        {tab === FRIENDS_TAB_ADD && <AddFriend />}
    </div>
  );
};

export default Friends;
