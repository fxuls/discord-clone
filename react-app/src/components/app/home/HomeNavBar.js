import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { setDirectMessageId } from "../../../store/ui";
import { directMessagesIdsSelector } from "../../../store/directMessages";
import DirectMessageChatCard from "./directMessages/DirectMessageChatCard";

const HomeNavBar = ({ currentDirectMessageId }) => {
  const dispatch = useDispatch();
  const directMessageChatIds = useSelector(directMessagesIdsSelector);

  // rerender on change in directMessageChatIds
  useEffect(() => {}, [directMessageChatIds]);

  return (
    <div className="nav-bar left-inset-shadow">
      <div
        className="nav-item unselectable"
        id="friends-button"
        active={(currentDirectMessageId === null) + ""}
        onClick={() => dispatch(setDirectMessageId(null))}
      >
        <FontAwesomeIcon className="icon" icon={faUsers} />
        <h1>Friends</h1>
      </div>

      <h2 className="unselectable sub-header-text">Direct messages</h2>

      <ul>
        {directMessageChatIds.map((userId) => <li key={userId}><DirectMessageChatCard userId={userId}/></li>)}
      </ul>
    </div>
  );
};

export default HomeNavBar;
