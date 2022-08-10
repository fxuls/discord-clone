import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import {
  setDirectMessageId,
  uiDirectMessageIdSelector,
  setFriendsTab,
  FRIENDS_TAB_ALL,
} from "../../../store/ui";
import { directMessagesIdsSelector } from "../../../store/directMessages";
import DirectMessageChatCard from "./directMessages/DirectMessageChatCard";

const HomeNavBar = ({ currentDirectMessageId }) => {
  const dispatch = useDispatch();
  const directMessageChatIds = useSelector(directMessagesIdsSelector);
  const uiDirectMessageId = useSelector(uiDirectMessageIdSelector);

  // rerender on change in directMessageChatIds or uiDirectMessageId
  useEffect(() => {}, [directMessageChatIds, uiDirectMessageId]);

  const onOpenFriends = () => {
    if (uiDirectMessageId) dispatch(setFriendsTab(FRIENDS_TAB_ALL));
    dispatch(setDirectMessageId(null));
  };

  return (
    <div className="nav-bar left-inset-shadow transparent-caret-color">
      <div
        className="nav-item unselectable"
        id="friends-button"
        active={(currentDirectMessageId === null) + ""}
        onClick={onOpenFriends}
      >
        <div className="nav-icon flex-center">
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <h1>Friends</h1>
      </div>

      <h2 className="unselectable sub-header-text">Direct messages</h2>

      <ul>
        {directMessageChatIds.map((userId) => (
          <li key={userId}>
            <DirectMessageChatCard
              userId={userId}
              active={userId === uiDirectMessageId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeNavBar;
