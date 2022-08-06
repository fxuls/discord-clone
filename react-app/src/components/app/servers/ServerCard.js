import { useDispatch } from "react-redux";
import { setServer } from "../../../store/ui";

const ServerCard = ({ server }) => {
  const dispatch = useDispatch();

  const openServer = () => dispatch(setServer(server.id));

  return (
    <div className="server-card">
      <img
        onClick={openServer}
        className="server-icon"
        src={server.server_image_url}
      />
    </div>
  );
};

export default ServerCard;
