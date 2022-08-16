import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";
import { leaveServer } from "../../../store/servers";
import { setServer, showAddChannelModal } from "../../../store/ui";

import ChannelCard from "./ChannelCard";
import CurrentUserNavItem from "../home/CurrentUserNavItem";

const ServerNavBar = ({ server, loaded, activeChannelId, permission }) => {
  const dispatch = useDispatch();
  const channels = server.channels && Object.values(server.channels);

  // rerender on change in channels
  useEffect(() => {}, [channels]);

  const onLeave = async () => {
    await dispatch(leaveServer(server.id));
    dispatch(setServer(null));
  };

  const onAddChannel = () => dispatch(showAddChannelModal());

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
        <div className="channels-header-container">
          <h2 className="sub-header-text unselectable" id="channel-list-header">Channels</h2>
          {(permission.permission === 4) && <FontAwesomeIcon icon={faPlus} className="add-channel-icon transparent-caret-color" onClick={onAddChannel} />}
        </div>

        <ul>
          {loaded &&
            channels &&
            channels.map((channel) => (
              <li key={channel.id}>
                <ChannelCard
                  channel={channel}
                  className="nav-item"
                  active={channel.id === activeChannelId}
                />
              </li>
            ))}
        </ul>

      </div>

      <CurrentUserNavItem />
    </div>
  );
};

export default ServerNavBar;
