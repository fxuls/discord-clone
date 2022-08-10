import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../../../store/users";
import { setDirectMessageId } from "../../../../store/ui";

const DirectMessageChatCard = ({ userId, active}) => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector(userId));
    const name = user.username.split("#")[0];

    // rerender on change in user
    useEffect(() => {}, [user]);

    return <div className="nav-item direct-message-chat-card" active={active + ""} onClick={() => dispatch(setDirectMessageId(userId))}>
        {user.profile_image_url ? (
          <img className="user-icon nav-icon" src={user.profile_image_url} />
        ) : (
          <div
            className="default-image-container nav-icon"
            style={{ backgroundColor: user.color }}
          >
            <img className="user-icon nav-icon" src="/assets/default-user.png" />
          </div>
        )}

        <h1>{name}</h1>
    </div>
}

export default DirectMessageChatCard;
