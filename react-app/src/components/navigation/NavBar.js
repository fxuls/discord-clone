import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userSelector } from "../../store/session";
import AuthenticatedNav from "./AuthenticatedNav";
import UnauthenticatedNav from "./UnauthenticatedNav";

const NavBar = () => {
  const history = useHistory();
  const sessionUser = useSelector(userSelector);

  return (
    <nav>
      <img className="masthead unselectable" src="/assets/discord-logo-banner.png" />

      {sessionUser ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </nav>
  );
};

export default NavBar;
