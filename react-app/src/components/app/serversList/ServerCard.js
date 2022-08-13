import { useDispatch } from "react-redux";
import { setServer } from "../../../store/ui";

const ServerCard = ({ server, active }) => {
  const dispatch = useDispatch();

  const openServer = () => dispatch(setServer(server.id));

  return (
    <div className="server-card">
      <img
        onClick={openServer}
        alt="Server icon"
        className="server-icon unselectable"
        active={active + ""}
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
