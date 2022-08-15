import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sessionUserSelector } from "../../store/session";
import AuthenticatedNav from "./AuthenticatedNav";
import UnauthenticatedNav from "./UnauthenticatedNav";

const NavBar = () => {
  const history = useHistory();
  const sessionUser = useSelector(sessionUserSelector);

  return (
    <nav>
      <img className="masthead unselectable" src="/assets/discord-logo-banner.png" onClick={() => history.push("/")}/>

      {sessionUser ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </nav>
  );
};

export default NavBar;
