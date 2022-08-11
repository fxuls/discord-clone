import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiServerChannelSelector, uiServerIdSelector } from "../../../store/ui";
import { fetchServerChannels, serverSelector, } from "../../../store/servers";

import ServerNavBar from "./ServerNavBar";
import ServerMessages from "./ServerMessages";

const Server = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const uiServerId = useSelector(uiServerIdSelector);
  const server = useSelector(serverSelector(uiServerId));

  let uiServerChannelId = useSelector(uiServerChannelSelector(uiServerId));
  // if no channel click set use the first channel
  if (loaded && server?.channels && !uiServerChannelId)
    uiServerChannelId = server.channels[0].id;

  useEffect(() => setLoaded(false), [uiServerId])

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchServerChannels(uiServerId));
        setLoaded(true);
      })();
  }, [dispatch, loaded, uiServerId, server]);

  return (
    <div className="server content">
      <ServerNavBar loaded={loaded} server={server} activeChannelId={uiServerChannelId}/>

      <ServerMessages loaded={loaded} server={server}/>
    </div>
  );
};

export default Server;
