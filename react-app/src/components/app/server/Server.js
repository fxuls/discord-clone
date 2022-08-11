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
  const uiServerChannelId = useSelector(uiServerChannelSelector(uiServerId));
  const server = useSelector(serverSelector(uiServerId));

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
      <ServerNavBar loaded={loaded} server={server} uiServerChannelId={uiServerChannelId}/>

      <ServerMessages loaded={loaded} server={server}/>
    </div>
  );
};

export default Server;
