import NavBar from "../navigation/NavBar";
import SignInForm from "./SignInForm";

const SignInPage = () => {
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
