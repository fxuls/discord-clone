import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  serverChannelsSelector,
  serverSelector,
  leaveServer,
} from "../../../store/servers";

const ServerNavBar = ({ loaded, serverId }) => {
  const dispatch = useDispatch();
  const server = useSelector(serverSelector(serverId));
  const channels = useSelector(serverChannelsSelector(serverId));

  // rerender on change in channels
  useEffect(() => {}, [channels]);

  const onLeave = () => dispatch(leaveServer());

  return (
    <div className="nav-bar server-nav-bar left-inset-shadow">
      <div className="server-nav-header nav-padding left-inset-shadow">
        <h1>{server.name}</h1>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          onClick={onLeave}
          className="unselectable leave-server-icon transparent-caret-color"
        />
      </div>

      <div className="server-channels header-box-shadow nav-padding">
        <h2 className="sub-header-text unselectable">Channels</h2>
      </div>
    </div>
  );
};

export default ServerNavBar;
