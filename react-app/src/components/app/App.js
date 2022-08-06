import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJoinedServers } from "../../store/servers";

import SignOutButton from "../auth/SignOutButton";
import ServerList from "./servers/ServerList";

const App = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchJoinedServers());
        setLoaded(true);
      })();
  }, [dispatch, loaded]);

  if (!loaded) return <div className="app">Loading...</div>;

  return (
    <div className="app">
        <ServerList />
        <SignOutButton />
    </div>
  );
};

export default App;
