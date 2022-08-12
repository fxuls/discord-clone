import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { serverChannelSelector } from "../../../store/servers";

const ServerMessagesHeader = ({ serverId, channelId }) => {
  const channel = useSelector(serverChannelSelector(serverId, channelId));
  const name = channel?.name.toLowerCase();

  return (
    <div className="header messages-header transparent-caret-color">
      <h1 className="unselectable">
        <FontAwesomeIcon icon={faHashtag} className="icon" />
        <span>{name}</span>
      </h1>
    </div>
  );
};

export default ServerMessagesHeader;
