import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, userSelector } from "./store/session";
import HomePage from "./components/HomePage";
import AuthenticatedApp from "./components/AuthentciatedApp";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(userSelector);

  // use effect for intial load
  useEffect(() => {
    if (!loaded)
      (async () => {
        try {
          await dispatch(authenticate());
        } finally {
          setLoaded(true);
        }
      })();
  }, [dispatch, loaded]);

  if (!loaded) return null;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>

        <ProtectedRoute path="/app">
          <AuthenticatedApp />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
