import { Route } from "react-router-dom";
import NavBar from "./NavBar";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";

const HomePage = () => {
    return (<div>
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
    </div>)
}

export default HomePage;
