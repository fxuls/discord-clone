import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { leaveServer } from "../../../store/servers";
import { setServer } from "../../../store/ui";

import ChannelCard from "./ChannelCard";

const ServerNavBar = ({ server, loaded }) => {
  const dispatch = useDispatch();
  const channels = server.channels;

  // rerender on change in channels
  useEffect(() => {}, [channels]);

  const onLeave = async () => {
    await dispatch(leaveServer(server.id));
    dispatch(setServer(null));
  };

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

        <ul>
          {loaded &&
            channels.map((channel) => (
              <li key={channel.id}>
                <ChannelCard channel={channel} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ServerNavBar;
