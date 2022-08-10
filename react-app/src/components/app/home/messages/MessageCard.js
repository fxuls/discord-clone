import { useSelector } from "react-redux";
import { userSelector } from "../../../../store/users";

const MessageCard = ({ message }) => {
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
          <div className="default-image-container"
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
    </div>
  );
};

export default MessageCard;
