import { useState, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import App from "./components/app/App";
import UnauthenticatedApp from "./components/UnauthenticatedApp";
import ThemeProvider from "./components/ThemeProvider";

const Root = () => {
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
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/app">
            <App />
          </ProtectedRoute>

          <UnauthenticatedApp />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
