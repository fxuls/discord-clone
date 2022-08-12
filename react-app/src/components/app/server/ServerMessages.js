import { useSelector } from "react-redux";
import { serverChannelMessagesSelector } from "../../../store/serverMessages";
import { serverChannelSelector } from "../../../store/servers";

import MessageCard from "../home/messages/MessageCard";
import ServerMessagesHeader from "./ServerMessagesHeader";
import ChatBox from "../home/messages/ChatBox";

const ServerMessages = ({ loaded, server, channelId }) => {
  const messages = useSelector(
    serverChannelMessagesSelector(server.id, channelId)
  );
  const channel = serverChannelSelector(server.id, channelId);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("send message to channel");
  }

  return (
    <div className="messages-container main left-inset-shadow">
      <ServerMessagesHeader serverId={server.id} channelId={channelId} />

      <div className="messages header-box-shadow">
        <ul className="message-list">
          {loaded &&
            messages &&
            messages.map((message) => (
              <li key={message.id}>
                <MessageCard message={message} />
              </li>
            ))}
        </ul>
      </div>

      <ChatBox sendMessage={sendMessage} placeholder={channel && `Message #${channel.name.toLowerCase()}`} />
    </div>
  );
};

export default ServerMessages;
