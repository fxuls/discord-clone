import { Route } from "react-router-dom";
import NavBar from "./NavBar";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import HomePage from "./HomePage";

const UnauthenticatedApp = () => {
  return (
    <div>
      <NavBar />

      <Route path="/" exact={true}>
        <HomePage />
      </Route>

      <Route path="/sign-in" exact={true}>
        <SignInForm />
      </Route>

      <Route path="/sign-up" exact={true}>
        <SignUpForm />
      </Route>
    </div>
  );
};

export default UnauthenticatedApp;
