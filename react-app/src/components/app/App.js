import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedServers } from "../../store/servers";
import { fetchUser } from "../../store/users";
import { currentUserIdSelector } from "../../store/session";
import { uiServerIdSelector } from "../../store/ui";
import {
  directMessageChatIdsSelector,
  fetchDirectChat,
} from "../../store/directMessages";
import { fetchServerMessages } from "../../store/serverMessages";

import { SocketContext } from "../sockets";
import ServerList from "./serversList/ServerList";
import Home from "./home/Home";
import Server from "./server/Server";

const App = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const uiServerId = useSelector(uiServerIdSelector);
  const [loaded, setLoaded] = useState(false);
  const currentUserId = useSelector(currentUserIdSelector);
  const directMessageChatIds = useSelector(directMessageChatIdsSelector);

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchJoinedServers());
        await dispatch(fetchUser(currentUserId));
        setLoaded(true);

        // socket.on("UPDATE_DIRECT_MESSAGE_CHAT", async (data) => {
        //   console.log("UPDATE_DIRECT_MESSAGE_CHAT", data, directMessageChatIds);
        //   // if (directMessageChatIds.includes(data.chat_id + ""))
        //   await dispatch(fetchDirectChat(data.chat_id));
        // });

        // socket.on("UPDATE_SERVER_MESSAGES", async (data) => {
        //   console.log("UPDATE_SERVER_MESSAGES", data);
        //   await dispatch(fetchServerMessages(data.server_id));
        // });
      })();
  }, [dispatch, loaded, uiServerId, currentUserId]);

  if (!loaded) return null;

  return (
    <div className="app">
      <ServerList />

      {uiServerId ? <Server /> : <Home />}

      <div
        style={{
          backgroundColor: "var(--third-bg-color)",
          gridArea: "messages",
        }}
      />
    </div>
  );
};

export default App;
