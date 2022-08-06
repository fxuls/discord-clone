import { useSelector } from "react-redux";
import { joinedServersSelector } from "../../../store/servers";
import ServerCard from "./ServerCard";

const ServerList = () => {
  const joinedServers = useSelector(joinedServersSelector);

  return (
    <div className="server-list">
      {joinedServers.map((server) => <ServerCard key={server.id} server={server} />)}
    </div>
  );
};

export default ServerList;
