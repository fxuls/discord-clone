import { NavLink } from "react-router-dom";

const UnauthenticatedNav = () => {
  return <div className="nav-links">
    <NavLink to="/sign-in">Sign in</NavLink>
    <NavLink to="/sign-up">Sign up</NavLink>
  </div>;
};

export default UnauthenticatedNav;
