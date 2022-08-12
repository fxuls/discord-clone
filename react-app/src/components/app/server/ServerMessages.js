import { useSelector } from "react-redux";
import {
  serverMessagesSelector,
  serverChannelMessagesSelector,
} from "../../../store/serverMessages";

import MessageCard from "../home/messages/MessageCard";

const ServerMessages = ({ loaded, server, channelId }) => {
  const messages = useSelector(
    serverChannelMessagesSelector(server.id, channelId)
  );

  if (!loaded || !messages?.length) return <div>No messages here yet...</div>;

  return (
    <div className="server-messages">
      {messages.map((message) => (
        <li key={message.id}>
          <MessageCard message={message} />
        </li>
      ))}
    </div>
  );
};

export default ServerMessages;
