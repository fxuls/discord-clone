import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const ChannelCard = ({ channel }) => {
    return <div className="channel-card nav-item unselectable transparent-caret-color">
        <FontAwesomeIcon icon={faHashtag} className="hashtag-icon" />
        <span className="channel-name">{channel.name}</span>
    </div>
}

export default ChannelCard;
