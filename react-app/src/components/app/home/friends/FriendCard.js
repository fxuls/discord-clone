import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faUserXmark,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { unfriendUser, userSelector, friendUser } from "../../../../store/users";
import { setDirectMessageId } from "../../../../store/ui";

const FriendCard = ({ userId, type }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector(userId));
  const username = user.username.split("#");

  const onRemoveFriend = () => dispatch(unfriendUser(user.id));
  const onOpenMessages = () => dispatch(setDirectMessageId(user.id));
  const onAcceptRequest = () => dispatch(friendUser(user.id));

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
      <div className="friend-icon">
        {user.profile_image_url ? (
          <img className="friend-icon" src={user.profile_image_url} />
        ) : (
          <div
            className="default-image-container"
            style={{ backgroundColor: user.color }}
          >
            <img className="friend-icon" src="/assets/default-user.png" />
          </div>
        )}
      </div>

      <div className="info">
        <span className="name">{username[0]}</span>
        <span className="numbers">{"#" + username[1]}</span>
      </div>

      {buttons}
    </div>
  );
};

export default FriendCard;
