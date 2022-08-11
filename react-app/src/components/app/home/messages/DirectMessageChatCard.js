import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { userSelector } from "../../../../store/users";
import { setDirectMessageId } from "../../../../store/ui";
import {
  directMessageChatSelector,
  deleteDirectMessageChat,
} from "../../../../store/directMessages";

const DirectMessageChatCard = ({ directMessageChatId, active }) => {
  const dispatch = useDispatch();
  const chat = useSelector(directMessageChatSelector(directMessageChatId));
  const user = useSelector(userSelector(chat.userId));
  const name = user.username.split("#")[0];

  // rerender on change in user
  useEffect(() => {}, [user]);

  const onDeleteDirectChat = () =>
    dispatch(deleteDirectMessageChat(directMessageChatId));

  return (
    <div
      className="nav-item direct-message-chat-card unselectable"
      active={active + ""}
      onClick={() => dispatch(setDirectMessageId(directMessageChatId))}
    >
      {user.profile_image_url ? (
        <img
          draggable={false}
          className="user-icon nav-icon"
          alt="User icon"
          src={user.profile_image_url}
        />
      ) : (
        <div
          className="default-image-container nav-icon"
          style={{ backgroundColor: user.color }}
        >
          <img
            draggable={false}
            className="user-icon nav-icon"
            alt="Default user icon"
            src="/assets/default-user.png"
          />
        </div>
      )}

      <h1>{name}</h1>

      <FontAwesomeIcon
        className="delete-chat-icon transparent-caret-color"
        icon={faXmark}
        onClick={onDeleteDirectChat}
      />
    </div>
  );
};

export default DirectMessageChatCard;
