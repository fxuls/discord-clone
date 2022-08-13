import { useSelector, useDispatch } from "react-redux";
import {
  serverChannelMessagesSelector,
  sendServerMessage,
  deleteServerMessage,
} from "../../../store/serverMessages";
import { serverChannelSelector } from "../../../store/servers";

import MessageCard from "../home/messages/MessageCard";
import ServerMessagesHeader from "./ServerMessagesHeader";
import ChatBox from "../home/messages/ChatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const ServerMessages = ({ loaded, server, channelId, permission }) => {
  const dispatch = useDispatch();
  const messages = useSelector(
    serverChannelMessagesSelector(server.id, channelId)
  );
  const channel = useSelector(serverChannelSelector(server.id, channelId));

  const sendMessage = (text, imageId) =>
    dispatch(
      sendServerMessage({ serverId: server.id, channelId, text, imageId })
    );

  return (
    <div className="messages-container main left-inset-shadow server-messages">
      <ServerMessagesHeader serverId={server.id} channelId={channelId} />

      <div className="messages header-box-shadow">
        <ul className="message-list">
          <div className="messages-top unselectable">
            <div className="top-icon-container">
              <FontAwesomeIcon icon={faHashtag} className="top-icon" />
            </div>

            <h1>{channel && `Welcome to #${channel.name.toLowerCase()}!`}</h1>

            <p className="transparent-caret-color">This is the start of the <span className="tag-important">#{channel && channel.name.toLowerCase()}</span> channel.</p>
          </div>

          {loaded &&
            messages &&
            messages.map((message) => (
              <li key={message.id}>
                <MessageCard
                  message={message}
                  permission={permission}
                  onDeleteMessage={() =>
                    dispatch(deleteServerMessage(server.id, message.id))
                  }
                />
              </li>
            ))}
        </ul>
      </div>

      <ChatBox
        sendMessage={sendMessage}
        placeholder={channel && `Message #${channel.name.toLowerCase()}`}
      />
    </div>
  );
};

export default ServerMessages;
