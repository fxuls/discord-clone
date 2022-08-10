import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { userSelector } from "../../../../store/users";
import { currentUserIdSelector } from "../../../../store/session";

const MessageCard = ({ message }) => {
  const userId = useSelector(currentUserIdSelector);
  const sender = useSelector(userSelector(message.sender_id));
  const name = sender.username.split("#")[0];

  return (
    <div className="message-card">
      <div className="message-icon-container">
        {sender.profile_image_url ? (
          <img
            className="user-icon message-icon"
            src={sender.profile_image_url}
          />
        ) : (
          <div
            className="default-image-container"
            style={{ backgroundColor: sender.color }}
          >
            <img
              className="message-icon user-icon"
              src="/assets/default-user.png"
            />
          </div>
        )}
      </div>

      <h1>{name}</h1>

      <div className="message-content">
        <p>{message.text}</p>
      </div>

      <div className="message-options unselectable transparent-caret-color">
        {sender.id === userId && <FontAwesomeIcon icon={faXmark} className="message-option-icon"/>}
      </div>
    </div>
  );
};

export default MessageCard;
