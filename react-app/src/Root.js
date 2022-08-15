import { useState, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./store/session";
import { uiModalSelector } from "./store/ui";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import App from "./components/app/App";
import UnauthenticatedApp from "./components/UnauthenticatedApp";
import Modal from "./components/modals/Modal";
import JoinServerPage from "./components/JoinServerPage";

const Root = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const modal = useSelector(uiModalSelector);

  // set theme
  document.body.setAttribute("data-theme", "default");

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
  }, [dispatch, loaded, modal]);

  if (!loaded) return null;

  return (
    <div>
      {modal && <Modal modal={modal} />}
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/app">
            <App />
          </ProtectedRoute>

          <ProtectedRoute path="/join">
            <JoinServerPage />
          </ProtectedRoute>

          <UnauthenticatedApp />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Root;
