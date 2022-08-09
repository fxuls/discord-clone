import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import {
  setFriendsTab,
  FRIENDS_TAB_ALL,
  FRIENDS_TAB_PENDING,
  uiFriendsTabSelector,
} from "../../../../store/ui";

const FriendHeader = () => {
  const dispatch = useDispatch();

  const currentTab = useSelector(uiFriendsTabSelector);

  return (
    <div className="friends-header">
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
    </div>
  );
};

export default FriendHeader;
