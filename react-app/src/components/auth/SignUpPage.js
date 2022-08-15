import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { sessionUserSelector } from "../../store/session"
import NavBar from "../navigation/NavBar";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
    const sessionUser = useSelector(sessionUserSelector);

    if (sessionUser) return <Redirect to="/app" />;

    return (
        <div className="form-page">
            <NavBar />
            <div className="form-container">
                <SignUpForm />
            </div>
        </div>
    );
}

export default SignUpPage;
