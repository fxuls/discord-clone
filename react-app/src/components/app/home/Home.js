import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../../store/users";
import { uiDirectMessageIdSelector } from "../../../store/ui";
import HomeNavBar from "./HomeNavBar";
import Friends from "./friends/Friends";

const Home = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const currentDirectMessageId = useSelector(uiDirectMessageIdSelector);

  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchFriends());
        setLoaded(true);
      })();
  }, [dispatch, loaded]);

  return (
    <div className="home content">
      <HomeNavBar currentDirectMessageId={currentDirectMessageId}/>

      {currentDirectMessageId ? "" : <Friends loaded={loaded}/>}
    </div>
  );
};

export default Home;
