import { useSelector } from "react-redux";
import {
  serverMessagesSelector,
  serverChannelMessagesSelector,
} from "../../../store/serverMessages";

import MessageCard from "../home/messages/MessageCard";
import ServerMessagesHeader from "./ServerMessagesHeader";

const ServerMessages = ({ loaded, server, channelId }) => {
  const messages = useSelector(
    serverChannelMessagesSelector(server.id, channelId)
  );

  return (
    <div className="messages-container main left-inset-shadow">
      <ServerMessagesHeader serverId={server.id} channelId={channelId} />

      <div className="messages header-box-shadow">
        <ul className="message-list">
          {loaded && messages?.length && messages.map((message) => (
            <li key={message.id}>
              <MessageCard message={message} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServerMessages;
