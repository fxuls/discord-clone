import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { setServerChannelId } from "../../../store/ui";

const ChannelCard = ({ channel }) => {
  const dispatch = useDispatch();
  const onOpenChannel = () =>
    dispatch(setServerChannelId(channel.server_id, channel.id));
    
  return (
    <div
      onClick={onOpenChannel}
      className="channel-card nav-item unselectable transparent-caret-color"
    >
      <FontAwesomeIcon icon={faHashtag} className="hashtag-icon" />
      <span className="channel-name">{channel.name}</span>
    </div>
  );
};

export default ChannelCard;
