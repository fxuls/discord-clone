import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { userSelector } from "../../../../store/users";
import { currentUserIdSelector } from "../../../../store/session";
import { showImageModal } from "../../../../store/ui";
import { deleteDirectMessage } from "../../../../store/directMessages";

const MessageCard = ({ message }) => {
  const dispatch = useDispatch();
  const userId = useSelector(currentUserIdSelector);
  const sender = useSelector(userSelector(message.sender_id));
  const name = sender.username.split("#")[0];

  const onDeleteMessage = () => dispatch(deleteDirectMessage(message.id));
  const onImageClick = () => dispatch(showImageModal(message.image_url));

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

      <h1 style={{ color: sender.color }}>{name}</h1>

      <div className="message-content">
        <p>{message.text}</p>

        {message.image_url && (
          <img src={message.image_url} onClick={onImageClick} />
        )}
      </div>

      <div className="message-options unselectable transparent-caret-color">
        {sender.id === userId && (
          <FontAwesomeIcon
            icon={faXmark}
            className="message-option-icon"
            onClick={onDeleteMessage}
          />
        )}
      </div>
    </div>
  );
};

export default MessageCard;
