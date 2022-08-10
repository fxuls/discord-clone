import { useSelector } from "react-redux";
import { userSelector } from "../../../../store/users";

const MessageCard = ({ message }) => {
    const sender = useSelector(userSelector(message.sender_id));

    return <div className="message-card">
        {sender.profile_image_url ? (
        <img className="user-icon message-icon" src={sender.profile_image_url} />
      ) : (
        <div
          className="default-image-container message-icon"
          style={{ backgroundColor: sender.color }}
        >
          <img className="user-icon message-icon" src="/assets/default-user.png" />
        </div>
      )}
        {message.text}
        </div>;
}

export default MessageCard;
