import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

import { userSelector } from "../../../../store/users";
import { currentUserIdSelector } from "../../../../store/session";
import { showImageModal } from "../../../../store/ui";
import { useEffect } from "react";
import { editDirectMessage } from "../../../../store/directMessages";

const MessageCard = ({ message, onDeleteMessage, permission, loaded }) => {
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const userId = useSelector(currentUserIdSelector);
  const sender = useSelector(userSelector(message.sender_id));

  useEffect(() => {}, [sender, userId, loaded]);

  if (!sender || !message) return null;

  const name = sender?.username.split("#")[0];

  // calculate dateString
  let dateString;
  const sentAt = moment(message.sent_at);
  const now = moment(new Date());
  switch (now.diff(sentAt, "days")) {
    case 1:
      dateString = "Yesterday at " + sentAt.format("h:mm A");
      break;
    case 0:
      if (now.diff(sentAt, "hours") === 0)
        if (now.diff(sentAt, "minutes") === 0)
          dateString = "Under a minute ago";
        else dateString = now.diff(sentAt, "minutes") + " minutes ago";
      else dateString = "Today at " + sentAt.format("h:mm A");
      break;

    default:
      dateString = sentAt.format("MM/DD/YYYY");
  }

  const onImageClick = () => dispatch(showImageModal(message.image_url));

  // const onEditClick = () => dispatch(editDirectMessage({ messageId: message.id, text: "TEST EDIT MESSAGE"}));
  const onEditClick = () => {
    setInEditMode(true);
    setEditText(message.text);
  };

  const onEditSubmit = (e) => {
    e.preventDefault();

    if (editText.trim().length === 0 || editText.length > 700) return;

    dispatch(
      editDirectMessage({
        messageId: message.id,
        text: editText,
      })
    );
    setEditText("");
    setInEditMode(false);
  };

  return (
    <div className="message-card">
      <div className="message-icon-container unselectable">
        {sender &&
          (sender.profile_image_url ? (
            <img
              className="user-icon message-icon"
              alt="Sender icon"
              src={sender.profile_image_url}
            />
          ) : (
            <div
              className="default-image-container"
              style={{ backgroundColor: sender.color }}
            >
              <img
                className="message-icon user-icon"
                alt="Default user icon"
                src="/assets/default-user.png"
              />
            </div>
          ))}
      </div>

      <div className="message-header">
        <h1 style={{ color: sender.color }}>{name}</h1>
        <h2 className="timestamp">{dateString}</h2>
      </div>

      <div className="message-content">
        {inEditMode ? (
          <form onSubmit={onEditSubmit} autoComplete="off">
            <input
              type="text"
              name="editText"
              value={editText}
              onChange={(e) => {
                if (e.target.value.length <= 700) setEditText(e.target.value);
              }}
            />
            <input type="submit" style={{ display: "none" }} />
          </form>
        ) : (
          <p>{message.text}</p>
        )}

        {message.image_url && (
          <img
            src={message.image_url}
            onClick={onImageClick}
            alt={message.image_url}
          />
        )}
      </div>

      <div className="message-options unselectable transparent-caret-color">
        {(sender.id === userId || permission?.permission >= 3) && (
          <FontAwesomeIcon
            icon={faXmark}
            className="message-option-icon"
            onClick={onDeleteMessage}
          />
        )}

        {sender.id === userId && (
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="message-option-icon"
            onClick={onEditClick}
          />
        )}
      </div>
    </div>
  );
};

export default MessageCard;
