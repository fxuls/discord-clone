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
    <form onSubmit={onSignIn}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Sign in</button>
      </div>
    </form>
  );
};

export default SignInForm;
