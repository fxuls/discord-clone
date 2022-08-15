import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { sessionUserSelector } from "../../store/session";
import NavBar from "../navigation/NavBar";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  const sessionUser = useSelector(sessionUserSelector);

  if (sessionUser) return <Redirect to="/app" />

  return (
    <div className="form-page">
      <NavBar />
      <div className="form-container">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
