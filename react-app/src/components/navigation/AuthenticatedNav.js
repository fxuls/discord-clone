import { useHistory } from "react-router-dom";

const AuthenticatedNav = () => {
  const history = useHistory();

  const openApp = () => history.push("/app");

  return (
    <div className="nav-links">
      <button onClick={openApp}>Open Discord</button>
    </div>
  );
};

export default AuthenticatedNav;
