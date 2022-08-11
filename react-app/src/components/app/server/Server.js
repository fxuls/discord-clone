import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiServerIdSelector } from "../../../store/ui";

import ServerNavBar from "./ServerNavBar";
import ServerMessages from "./ServerMessages";

const Server = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const uiServerId = useSelector(uiServerIdSelector);

  useEffect(() => {
    if (!loaded)
      (async () => {
        console.log("Fetch server resouces");
        setLoaded(true);
      })();
  }, [dispatch, loaded]);

  return (
    <div>
      <ServerNavBar loaded={loaded} serverId={uiServerId} />

      <ServerMessages loaded={loaded} />
    </div>
  );
};

export default Server;
