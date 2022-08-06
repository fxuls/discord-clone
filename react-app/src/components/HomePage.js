import { useDispatch } from "react-redux";
import {
  fetchServer,
  fetchJoinedServers,
  removeServer,
  joinServerById,
  joinServerByUrl,
  leaveServer,
  fetchAllServers,
} from "../store/servers";

const HomePage = () => {
  const dispatch = useDispatch();

  const onClick = (e) => dispatch(fetchServer(1));
  return (
    <div>
      Hi! This is the Discord homepage
    </div>
  );
};

export default HomePage;
