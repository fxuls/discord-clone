import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const HomeNavBar = ({ currentDirectMessageId }) => {
    return <div className="nav-bar box-shadow-right">
        <div className="nav-item unselectable" id="friends-button" active={(currentDirectMessageId === null) + ""}><FontAwesomeIcon className="icon" icon={faUsers} /><h1>Friends</h1></div>
        <h2 className="unselectable">Direct messages</h2>
    </div>
}

export default HomeNavBar;
