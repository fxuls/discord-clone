import { Route } from "react-router-dom";
import SignUpForm from "./auth/SignUpForm";
import HomePage from "./HomePage";
import SignInPage from "./auth/SignInPage";

const UnauthenticatedApp = () => {
  return (
    <div className="unauth-app fill-height">
      <Route path="/" exact={true}>
        <HomePage />
      </Route>

      <Route path="/sign-in" exact={true}>
        <SignInPage />
      </Route>

      <Route path="/sign-up" exact={true}>
        <SignUpForm />
      </Route>
    </div>
  );
};

export default UnauthenticatedApp;
