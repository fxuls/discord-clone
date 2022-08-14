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
import { directMessageChatIdsSelector } from "../../../store/directMessages";
import DirectMessageChatCard from "./messages/DirectMessageChatCard";
import CurrentUserNavItem from "./CurrentUserNavItem";

const HomeNavBar = ({ loaded }) => {
  const dispatch = useDispatch();
  const directMessageChatIds = useSelector(directMessageChatIdsSelector);
  const uiDirectMessageId = useSelector(uiDirectMessageIdSelector);

  // rerender on change in directMessageChatIds or uiDirectMessageId
  useEffect(() => {}, [directMessageChatIds, uiDirectMessageId, loaded]);

  const onOpenFriends = () => {
    if (uiDirectMessageId) {
      dispatch(setFriendsTab(FRIENDS_TAB_ALL));
      dispatch(setDirectMessageId(null));
    }
  };

  return (
    <div className="nav-bar left-inset-shadow transparent-caret-color">
      <div className="nav-padding">
        <div
          className="nav-item unselectable"
          id="friends-button"
          active={(uiDirectMessageId === null) + ""}
          onClick={onOpenFriends}
        >
          <div className="nav-icon flex-center">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <h1>Friends</h1>
        </div>

        <h2 className="unselectable sub-header-text">Direct messages</h2>

        <ul>
          {directMessageChatIds.map((directMessageChatId) => (
            <li key={directMessageChatId}>
              <DirectMessageChatCard
                directMessageChatId={directMessageChatId}
                active={directMessageChatId === uiDirectMessageId}
              />
            </li>
          ))}
        </ul>
      </div>

      <CurrentUserNavItem />
    </div>
  );
};

export default HomeNavBar;
