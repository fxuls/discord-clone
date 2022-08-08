import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const HomeNavBar = () => {
    return <div className="nav-bar">
        <div className="nav-item" id="friends-button"><FontAwesomeIcon className="icon" icon={faUsers} /><h1>Friends</h1></div>
        <h2 className="unselectable">Direct messages</h2>
    </div>
}

export default HomeNavBar;
