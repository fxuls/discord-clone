import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signIn } from "../../store/session";

const SignInForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignIn = async (e) => {
    e.preventDefault();

    const data = await dispatch(signIn(email, password));
    if (data) setErrors(data);
    else history.push("/app");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) return <Redirect to="/app" />;

  return (
    <form onSubmit={onSignIn} id="sign-in-form">
      <h1>Sign in</h1>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="jasonsmith@gmail.com"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
};

export default SignInForm;
