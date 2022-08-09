import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { setDirectMessageId } from "../../../store/ui";

const HomeNavBar = ({ currentDirectMessageId }) => {
  const dispatch = useDispatch();

  return (
    <div className="nav-bar left-inset-shadow">
      <div
        className="nav-item unselectable"
        id="friends-button"
        active={(currentDirectMessageId === null) + ""}
        onClick={() => dispatch(setDirectMessageId(null))}
      >
        <FontAwesomeIcon className="icon" icon={faUsers} />
        <h1>Friends</h1>
      </div>
      <h2 className="unselectable sub-header-text">Direct messages</h2>
    </div>
  );
};

export default HomeNavBar;
