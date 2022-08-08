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
      <div className="server-info-modal">
        <div className="left-arrow"></div>
        <div className="server-info">
          {server.name}
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
