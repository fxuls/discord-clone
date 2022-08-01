import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { userSelector } from "../store/session";
import NavBar from "./NavBar";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import { useEffect } from "react";

const HomePage = () => {
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) return <Redirect to="/" />
  }, [user])
  
  return (
    <div>
      <NavBar />

      <Route path="/sign-in" exact={true}>
        <SignInForm />
      </Route>

      <Route path="/sign-up" exact={true}>
        <SignUpForm />
      </Route>

      <Route path="/" exact={true}>
        Homepage
      </Route>
    </div>
  );
};

export default HomePage;
