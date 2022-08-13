import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedServers } from "../../store/servers";
import { fetchUser } from "../../store/users";
import { currentUserIdSelector } from "../../store/session";
import { uiServerIdSelector } from "../../store/ui";
import { fetchDirectMessages } from "../../store/directMessages";

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

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchJoinedServers());
        await dispatch(fetchUser(currentUserId));
        setLoaded(true);

        socket.on("NEW_DIRECT_MESSAGE", (data) => {
          dispatch(fetchDirectMessages());
        });
      })();
  }, [dispatch, loaded, uiServerId, currentUserId]);

  if (!loaded) return <div className="app">Loading...</div>;

  return (
    <div className="app">
      <ServerList />

      {uiServerId ? <Server /> : <Home />}

      <div style={{backgroundColor: "var(--third-bg-color)", gridArea: "messages"}} />
    </div>
  );
};

export default App;
