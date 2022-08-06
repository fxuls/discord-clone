import { useSelector } from "react-redux";
import { joinedServersSelector, serverSelector } from "../../../store/servers";
import ServerIcon from "./ServerIcon";

const ServerList = () => {
  const joinedServers = useSelector(joinedServersSelector);

  return (
    <div className="server-list">
      {joinedServers.map((server) => <ServerIcon key={server.id} server={server} />)}
    </div>
  );
};

export default ServerList;
