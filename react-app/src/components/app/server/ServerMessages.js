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

  if (!loaded || !messages?.length) return <div>No messages here yet...</div>;

  return (
    <div className="messages-container main left-inset-shadow">
      <ServerMessagesHeader serverId={server.id} channelId={channelId} />
      {messages.map((message) => (
        <li key={message.id}>
          <MessageCard message={message} />
        </li>
      ))}
    </div>
  );
};

export default ServerMessages;
