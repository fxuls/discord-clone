import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinedServersSelector } from "../../../store/servers";
import { clearServer, uiServerIdSelector } from "../../../store/ui";
import ServerCard from "./ServerCard";

const ServerList = () => {
  const dispatch = useDispatch();
  const joinedServers = useSelector(joinedServersSelector);
  const uiServerId = useSelector(uiServerIdSelector);

  // rerender on change in uiServerId
  useEffect(() => {}, [uiServerId]);

  const showHome = () => dispatch(clearServer());

  return (
    <div className="server-list-container box-shadow-right">
      <div className="server-list">
        <div className="server-card home-card" active={(uiServerId === null) + ""}>
          <img
            onClick={showHome}
            alt="Home icon"
            className="server-icon unselectable"
            src="/assets/default-user.png"
          />
          <div className="server-info-modal">
            <div className="left-arrow"></div>
            <div className="server-info">Home</div>
          </div>
        </div>

        <div className="list-seperator" />

        {joinedServers.map((server) => (
          <ServerCard
            key={server.id}
            server={server}
            active={uiServerId === server.id}
          />
        ))}

        <div className="list-seperator" />

        <div id="add-server-iconn" className="server-icon">
          +
        </div>
      </div>
    </div>
  );
};

export default ServerList;
