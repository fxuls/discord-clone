import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faUserXmark,
  faXmark,
  faCheck,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

import {
  unfriendUser,
  userSelector,
  friendUserById,
} from "../../../../store/users";
import { setDirectMessageId } from "../../../../store/ui";
import {
  chatByUserId,
  createDirectMessageChat,
} from "../../../../store/directMessages";

const FriendCard = ({ userId, type }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector(userId));
  const username = user.username.split("#");
  const chat = useSelector(chatByUserId(user.id));

  const onRemoveFriend = () => dispatch(unfriendUser(user.id));
  const onAcceptRequest = () => dispatch(friendUserById(user.id));
  const onCopyUsername = () => navigator.clipboard.writeText(user.username);
  const onOpenMessages = async () => {
    if (!chat) {
      const newChat = await dispatch(createDirectMessageChat(userId));
      dispatch(setDirectMessageId(newChat.id + ""));
    } else {
      dispatch(setDirectMessageId(chat.id + ""));
    }
  };

  let buttons;
  switch (type) {
    case "incoming":
      buttons = (
        <div className="buttons">
          <button onClick={onAcceptRequest}>
            <FontAwesomeIcon className="icon" icon={faCheck} />
          </button>
          <button onClick={onRemoveFriend}>
            <FontAwesomeIcon className="icon" icon={faXmark} />
          </button>
        </div>
      );
      break;

    case "sent":
      buttons = (
        <div className="buttons">
          <button onClick={onRemoveFriend}>
            <FontAwesomeIcon className="icon" icon={faXmark} />
          </button>
        </div>
      );
      break;

    default:
      buttons = (
        <div className="buttons">
          <button onClick={onOpenMessages}>
            <FontAwesomeIcon className="icon" icon={faMessage} />
          </button>
          <button onClick={onRemoveFriend}>
            <FontAwesomeIcon className="icon" icon={faUserXmark} />
          </button>
        </div>
      );
  }

  return (
    <div className="friend-card">
      <div className="unselectable">
        {user.profile_image_url ? (
          <img
            draggable={false}
            className="friend-icon user-icon"
            alt="User icon"
            src={user.profile_image_url}
          />
        ) : (
          <div
            className="default-image-container"
            style={{ backgroundColor: user.color }}
          >
            <img
              draggable={false}
              className="friend-icon user-icon"
              alt="Default user icon"
              src="/assets/default-user.png"
            />
          </div>
        )}
      </div>

      <div className="info">
        <span className="name">{username[0]}</span>
        <span className="numbers">{"#" + username[1]}</span>
        <span
          className="copy-icon transparent-caret-color"
          onClick={onCopyUsername}
        >
          <FontAwesomeIcon icon={faCopy} />
        </span>
      </div>

      {buttons}
    </div>
  );
};

export default FriendCard;
