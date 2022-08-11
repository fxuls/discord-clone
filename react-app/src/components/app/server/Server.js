import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiServerIdSelector } from "../../../store/ui";
import { fetchServerChannels } from "../../../store/servers";

import ServerNavBar from "./ServerNavBar";
import ServerMessages from "./ServerMessages";

const Server = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const uiServerId = useSelector(uiServerIdSelector);

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchServerChannels(uiServerId));
        setLoaded(true);
      })();
  }, [dispatch, loaded, uiServerId]);

  return (
    <div>
      <ServerNavBar loaded={loaded} serverId={uiServerId} />

      <ServerMessages loaded={loaded} />
    </div>
  );
};

export default Server;
