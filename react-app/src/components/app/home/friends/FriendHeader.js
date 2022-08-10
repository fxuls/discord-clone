import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import {
  setFriendsTab,
  FRIENDS_TAB_ALL,
  FRIENDS_TAB_PENDING,
  uiFriendsTabSelector,
  FRIENDS_TAB_ADD,
} from "../../../../store/ui";

const FriendHeader = () => {
  const dispatch = useDispatch();

  const currentTab = useSelector(uiFriendsTabSelector);

  return (
    <div className="header">
      <h1 className="unselectable">
        <FontAwesomeIcon icon={faUsers} className="icon" />
        <span>Friends</span>
      </h1>

      <button
        className="text-button unselectable"
        active={(currentTab === FRIENDS_TAB_ALL) + ""}
        onClick={() => dispatch(setFriendsTab(FRIENDS_TAB_ALL))}
      >
        All
      </button>

      <button
        className="text-button unselectable"
        active={(currentTab === FRIENDS_TAB_PENDING) + ""}
        onClick={() => dispatch(setFriendsTab(FRIENDS_TAB_PENDING))}
      >
        Pending
      </button>

      <button
        className="text-button unselectable add-friend"
        active={(currentTab === FRIENDS_TAB_ADD) + ""}
        onClick={() => dispatch(setFriendsTab(FRIENDS_TAB_ADD))}
      >
        Add friend
      </button>
    </div>
  );
};

export default FriendHeader;
