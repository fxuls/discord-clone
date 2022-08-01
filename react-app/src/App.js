import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import AuthenticatedApp from "./components/AuthentciatedApp";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UnauthenticatedApp from "./components/UnauthenticatedApp";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

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
        <ProtectedRoute path="/app">
          <AuthenticatedApp />
        </ProtectedRoute>

        <UnauthenticatedApp />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
