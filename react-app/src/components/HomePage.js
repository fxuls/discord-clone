import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServers, publicServersSelector, fetchJoinedServers } from "../store/servers";
import NavBar from "./navigation/NavBar";
import ServerPreviewCard from "./ServerPreviewCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const publicServers = useSelector(publicServersSelector);

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchAllServers());
        await dispatch(fetchJoinedServers());
        setLoaded(true);
      })();
  }, [loaded]);

  return (
    <div className="homepage-container">
        <NavBar />
        <div className="homepage-header">
          <h1>Imagine a place...</h1>
          <p>
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>
      </div>

      <div className="homepage-servers header-box-shadow">
        <h2>Discover servers</h2>

        <div className="server-cards-container">
          {
            loaded && publicServers?.length && publicServers.map((server) => <ServerPreviewCard server={server} key={server.id} />)
          }
        </div>
      </div>
    </div>
  );
};

export default HomePage;
