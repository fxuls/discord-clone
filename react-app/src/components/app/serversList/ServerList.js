import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { joinedServersSelector } from "../../../store/servers";
import {
  clearServer,
  uiServerIdSelector,
  showCreateServerModal,
} from "../../../store/ui";
import ServerCard from "./ServerCard";

const ServerList = () => {
  const dispatch = useDispatch();
  const joinedServers = useSelector(joinedServersSelector);
  const uiServerId = useSelector(uiServerIdSelector);

  // rerender on change in uiServerId
  useEffect(() => {}, [uiServerId]);

  const showHome = () => dispatch(clearServer());
  const onAddServer = () => dispatch(showCreateServerModal());

  return (
    <div className="server-list-container box-shadow-right">
      <div className="server-list">
        <div
          className="server-card home-card"
          active={(uiServerId === null) + ""}
        >
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

        <div className="server-icons-list">
          {joinedServers.map((server) => (
            <ServerCard
              key={server.id}
              server={server}
              active={uiServerId === server.id}
            />
          ))}
        </div>

        <div className="list-seperator" />

        <div
          id="add-server-icon"
          className="server-card home-card"
          onClick={onAddServer}
        >
          <div className="server-icon">
            <FontAwesomeIcon icon={faPlus} className="icon" />
          </div>

          <div className="server-info-modal">
            <div className="left-arrow"></div>
            <div className="server-info">Create server</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerList;
