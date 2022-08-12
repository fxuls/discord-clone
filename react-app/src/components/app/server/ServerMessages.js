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

const ServerMessages = ({ loaded, server, channelId }) => {
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
    <div className="messages-container main left-inset-shadow">
      <ServerMessagesHeader serverId={server.id} channelId={channelId} />

      <div className="messages header-box-shadow">
        <ul className="message-list">
          {loaded &&
            messages &&
            messages.map((message) => (
              <li key={message.id}>
                <MessageCard message={message} onDeleteMessage={() => dispatch(deleteServerMessage(server.id, message.id))}/>
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
