import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../store/session";

const SignInForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const getEmailError = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
    return "";
  };

  const getPasswordError = () => (password ? "" : "Password is required");

  const onSignIn = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // validations
    const emailValidationError = getEmailError();
    const passwordValidationError = getPasswordError();

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    // if there are no errors make request
    if (!emailValidationError && !passwordValidationError) {
      const data = await dispatch(signIn(email, password));
      if (data) setErrors(data);
    }
  };

  const fillInDemoDetails = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  useEffect(() => {
    if (hasSubmitted) {
      setEmailError(getEmailError());
      setPasswordError(getPasswordError());

      // parse errors obj
      const errObj = errors.reduce((obj, error) => {
        error = error.split(" : ");
        obj[error[0]] = error[1];
        return obj;
      }, {});

      if (errObj.email) setEmailError(errObj.email);
      else if (errObj.password) setPasswordError(errObj.password);
    }
  }, [email, password, hasSubmitted, errors])

  return (
    <form onSubmit={onSignIn} id="sign-in-form">
      <h1>Sign in</h1>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="jasonsmith@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email" className="field-error">
          {emailError}
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password" className="field-error">
          {passwordError}
        </label>
      </div>

      <button type="submit">Sign in</button>

      <footer className="transparent-caret-color">
        <p>
          Need an account?<a href="/sign-up">Sign up</a>
        </p>
        <p>
          Just looking around?<a onClick={fillInDemoDetails}>Demo user</a>
        </p>
      </footer>
    </form>
  );
};

export default SignInForm;
