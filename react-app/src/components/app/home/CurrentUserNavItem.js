import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { currentUserIdSelector, signOut } from "../../../store/session";
import { userSelector } from "../../../store/users";

const CurrentUserNavItem = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(currentUserIdSelector);
  const user = useSelector(userSelector(currentUserId));
  const username = user.username.split("#");

  const onSignOut = () => dispatch(signOut());

  return (
    <div className="current-user-bar header-box-shadow transparent-caret-color">
      {user.profile_image_url ? (
        <img
          draggable={false}
          className="user-icon user-bar-icon"
          alt="User icon"
          src={user.profile_image_url}
        />
      ) : (
        <div
          className="default-image-container user-bar-icon"
          style={{ backgroundColor: user.color }}
        >
          <img
            draggable={false}
            className="user-icon user-bar-icon"
            alt="Default user icon"
            src="/assets/default-user.png"
          />
        </div>
      )}

      <div className="user-bar-name">
        <span className="name">{username[0]}</span>
        <span className="tag">{"#" + username[1]}</span>
      </div>

      <FontAwesomeIcon icon={faArrowRightFromBracket} className="sign-out-icon" onClick={onSignOut} />
    </div>
  );
};

export default CurrentUserNavItem;
