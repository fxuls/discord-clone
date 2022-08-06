import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedServers } from "../../store/servers";
import { uiServerIdSelector } from "../../store/ui";

import SignOutButton from "../auth/SignOutButton";
import ServerList from "./servers/ServerList";
import ServerNavBar from "./navBars/ServerNavBar";
import HomeNavBar from "./navBars/HomeNavBar";

const App = () => {
  const dispatch = useDispatch();
  const uiServerId = useSelector(uiServerIdSelector);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchJoinedServers());
        setLoaded(true);
      })();
  }, [dispatch, loaded, uiServerId]);

  if (!loaded) return <div className="app">Loading...</div>;

  return (
    <div className="app">
      <ServerList />

      {uiServerId ? <ServerNavBar serverId={uiServerId} /> : <HomeNavBar />}
      <SignOutButton />

      <div style={{backgroundColor: "var(--third-bg-color)", gridArea: "messages"}} />
    </div>
  );
};

export default App;
