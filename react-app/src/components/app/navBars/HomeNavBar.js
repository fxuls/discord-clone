import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const HomeNavBar = () => {
    return <div className="nav-bar">
        <h1><FontAwesomeIcon className="icon" icon={faUsers} />Friends</h1>
        <h2>Direct messages</h2>
    </div>
}

export default HomeNavBar;
