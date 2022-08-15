import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState([]);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateUsername = () => {
    let errorMessage = "";
    if (!username) errorMessage = "Username is required";
    else if (!/^.{3,40}#[0-9]{4}$/.test(username))
      errorMessage = "Username is invalid";
    setUsernameError(errorMessage);
    return !errorMessage;
  };

  const validateEmail = () => {
    let errorMessage = "";
    if (!email) errorMessage = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errorMessage = "Please enter a valid email";
    setEmailError(errorMessage);
    return errorMessage === "";
  };

  const validatePassword = () => {
    let errorMessage = "";
    if (!password) errorMessage = "Password is required";
    else if (password.length < 8)
      errorMessage = "Password must be at least 8 characters";
    else if (password.length > 128)
      errorMessage = "Password must be fewer than 128 characters";
    setPasswordError(errorMessage);
    return errorMessage === "";
  };

  const validateRepeatPassword = () => {
    let errorMessage = "";
    if (!repeatPassword) errorMessage = "Please re-enter your password";
    else if (repeatPassword !== password)
      errorMessage = "Passwords do not match";
    setRepeatPasswordError(errorMessage);
    return errorMessage === "";
  };

  useEffect(() => {
    if (hasSubmitted) {
      validateUsername();
      validateEmail();
      validatePassword();
      validateRepeatPassword();

      // parse backend errors obj
      const errObj = errors.reduce((obj, error) => {
        error = error.split(" : ");
        obj[error[0]] = error[1];
        return obj;
      }, {});

      if (errObj.username) setUsernameError(errObj.username);
      if (errObj.email) setEmailError(errObj.email);
      if (errObj.password) setPasswordError(errObj.password);
    }
  }, [username, email, password, repeatPassword, hasSubmitted, errors]);

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // validations
    const validations = [
      validateUsername(),
      validateEmail(),
      validatePassword(),
      validateRepeatPassword(),
    ];

    if (!validations.includes(false)) {
      const data = await dispatch(signUp(username, email, password));
      if (data) setErrors(data);
    }
  };

  return (
    <form onSubmit={onSignUp} id="sign-up-form">
      <h1>Sign up</h1>

      <div className="form-row">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="username" className="field-error">
          {usernameError}
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="email" className="field-error">
          {emailError}
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label htmlFor="password" className="field-error">
          {passwordError}
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          name="repeatPassword"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
        />
        <label htmlFor="repeatPassword" className="field-error">
          {repeatPasswordError}
        </label>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
