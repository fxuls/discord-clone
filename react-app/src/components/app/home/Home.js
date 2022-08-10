import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends, fetchFriendRequests } from "../../../store/users";
import { uiDirectMessageIdSelector } from "../../../store/ui";
import { fetchDirectMessages } from "../../../store/directMessages";
import HomeNavBar from "./HomeNavBar";
import Friends from "./friends/Friends";
import DirectMessages from "./directMessages/DirectMessages";

const Home = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const currentDirectMessageId = useSelector(uiDirectMessageIdSelector);

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchFriends());
        await dispatch(fetchFriendRequests());
        await dispatch(fetchDirectMessages());
        setLoaded(true);
      })();
  }, [dispatch, loaded]);

  return (
    <div className="home content">
      <HomeNavBar currentDirectMessageId={currentDirectMessageId} />

      {currentDirectMessageId ? (
        <DirectMessages loaded={loaded} />
      ) : (
        <Friends loaded={loaded} />
      )}
    </div>
  );
};

export default Home;
