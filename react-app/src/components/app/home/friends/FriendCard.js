import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserXmark } from "@fortawesome/free-solid-svg-icons";

import { unfriendUser, userSelector } from "../../../../store/users";
import { setDirectMessageId } from "../../../../store/ui";

const FriendCard = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector(userId));
  const username = user.username.split("#");

  const onRemoveFriend = () => dispatch(unfriendUser(user.id));
  const onOpenMessages = () => dispatch(setDirectMessageId(user.id));

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

      <div className="buttons">
        <button onClick={onOpenMessages}>
          <FontAwesomeIcon className="icon" icon={faMessage} />
        </button>
        <button onClick={onRemoveFriend}>
          <FontAwesomeIcon className="icon" icon={faUserXmark} />
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
