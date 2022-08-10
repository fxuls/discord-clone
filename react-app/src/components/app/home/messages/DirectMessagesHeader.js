import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { uiDirectMessageIdSelector } from "../../../../store/ui";
import { userSelector } from "../../../../store/users";
import { directMessageChatSelector } from "../../../../store/directMessages";

const DirectMessagesHeader = ({ user }) => {
    const name = user.username.split("#")[0];

    return <div className="header transparent-caret-color">
        <h1 className="unselectable">
            <FontAwesomeIcon icon={faAt} className="icon" />
            <span>{name}</span>
        </h1>
    </div>
}

export default DirectMessagesHeader;
