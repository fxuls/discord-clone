import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserXmark } from "@fortawesome/free-solid-svg-icons";

import { unfriendUser } from "../../../../store/users";

const FriendCard = ({ user }) => {
  const dispatch = useDispatch();
  const username = user.username.split("#");

  const onRemoveFriend = () => dispatch(unfriendUser(user.id));

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
        <button>
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
