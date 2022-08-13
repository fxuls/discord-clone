import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiServerChannelSelector, uiServerIdSelector } from "../../../store/ui";
import {
  fetchServerChannels,
  serverSelector,
  currentUserServerPermissionSelector,
} from "../../../store/servers";
import { fetchServerMessages } from "../../../store/serverMessages";

import ServerNavBar from "./ServerNavBar";
import ServerMessages from "./ServerMessages";
import { fetchUserIfNotExist } from "../../../store/users";

const Server = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const uiServerId = useSelector(uiServerIdSelector);
  const server = useSelector(serverSelector(uiServerId));
  const permission = useSelector(
    currentUserServerPermissionSelector(server.id)
  );

  let uiServerChannelId = useSelector(uiServerChannelSelector(uiServerId));
  // if no channel click set use the first channel
  if (loaded && server?.channels && !uiServerChannelId)
    uiServerChannelId = Object.values(server.channels)[0].id;

  useEffect(() => setLoaded(false), [uiServerId]);

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchServerChannels(uiServerId));
        const messages = await dispatch(fetchServerMessages(uiServerId));
        messages.forEach((message) => fetchUserIfNotExist(message.sender_id));

        setLoaded(true);
      })();
  }, [dispatch, loaded, uiServerId, server]);

  return (
    <div className="server content">
      <ServerNavBar
        loaded={loaded}
        server={server}
        permission={permission}
        activeChannelId={uiServerChannelId}
      />

      <ServerMessages
        loaded={loaded}
        server={server}
        channelId={uiServerChannelId}
        permission={permission}
      />
    </div>
  );
};

export default Server;
