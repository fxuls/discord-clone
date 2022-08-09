import { useSelector } from "react-redux";
import { friendsSelector } from "../../../../store/users";

import FriendHeader from "./FriendHeader";
import FriendCard from "./FriendCard";

const Friends = ({ loaded }) => {
  const friends = useSelector(friendsSelector);

  if (!loaded) return null;

  return (
    <div className="friends-container main left-inset-shadow">
      <FriendHeader />
      <div className="friends header-box-shadow">
      <h1 className="sub-header-text">{`Friends — ${friends.length}`}</h1>

        <ul className="friends-list">
          {friends.map((user) => <li key={user.id}><div className="list-seperator" /><FriendCard user={user} /></li>)}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
