import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiDirectMessageIdSelector } from "../../../../store/ui";
import { directMessageChatSelector, directMessagesSelector, deleteDirectMessage } from "../../../../store/directMessages";
import { userSelector } from "../../../../store/users";

import DirectMessagesHeader from "./DirectMessagesHeader";
import DirectMessageChatBox from "./DirectMessageChatBox";
import MessageCard from "./MessageCard";

const DirectMessages = ({ loaded }) => {
  const dispatch = useDispatch();
  const uiDirectMessageId = useSelector(uiDirectMessageIdSelector);
  const chat = useSelector(directMessageChatSelector(uiDirectMessageId));
  const messages = useSelector(directMessagesSelector(chat.id));
  const user = useSelector(userSelector(chat.userId));

  // rerender on change in chat
  useEffect(() => {}, [messages]);

  if (!loaded) return null;

  return (
    <div className="direct-messages-container main left-inset-shadow">
      <DirectMessagesHeader user={user} />

      <div className="direct-messages header-box-shadow">
        <ul className="message-list">
          <div className="messages-top unselectable">
            <div className="message-icon-container">
              {user.profile_image_url ? (
                <img
                  draggable={false}
                  className="user-icon message-icon"
                  alt="User icon"
                  src={user.profile_image_url}
                />
              ) : (
                <div
                  className="default-image-container"
                  style={{ backgroundColor: user.color }}
                >
                  <img
                    draggable={false}
                    className="message-icon user-icon"
                    alt="Default user icon"
                    src="/assets/default-user.png"
                  />
                </div>
              )}
            </div>

            <h1>{user.username.split("#")[0]}</h1>

            <p className="transparent-caret-color">This is the beginning of your direct message history with <span className="username">{user.username}</span>.</p>
          </div>
          {chat.messages.length &&
            chat.messages.map((message) => (
              <li key={message.id}>
                <MessageCard message={message} onDeleteMessage={() => dispatch(deleteDirectMessage(message.id))}/>
              </li>
            ))}
        </ul>
      </div>

      <DirectMessageChatBox partnerId={user.id} userName={ user.username.split("#")[0] }/>
    </div>
  );
};

export default DirectMessages;
