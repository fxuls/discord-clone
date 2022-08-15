import { Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignInPage from "./auth/SignInPage";
import SignUpPage from "./auth/SignUpPage";

const UnauthenticatedApp = () => {
  return (
    <div className="unauth-app fill-height">
      <Route path="/sign-in" exact={true}>
        <SignInPage />
      </Route>

      <Route path="/sign-up" exact={true}>
        <SignUpPage />
      </Route>

      <Route path="/">
        <HomePage />
      </Route>
    </div>
  );
};

export default UnauthenticatedApp;
