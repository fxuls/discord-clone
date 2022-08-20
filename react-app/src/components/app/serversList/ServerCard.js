import { useDispatch } from "react-redux";
import { setServer } from "../../../store/ui";

const ServerCard = ({ server, active }) => {
  const dispatch = useDispatch();
  const initials = server.name.split(" ").map(word => word[0]);

  const openServer = () => dispatch(setServer(server.id));

  return (
    <div
      className={server.server_image_url ? "server-card" : "server-card home-card"}
      active={active + ""}
    >
      {server.server_image_url ? (
        <img
          onClick={openServer}
          alt="Server icon"
          className="server-icon unselectable"
          active={active + ""}
          src={server.server_image_url}
        />
      ) : (
        <h1 className="server-icon" onClick={openServer} active={active + ""}>
          {initials.slice(0, 2).join("")}
        </h1>
      )}
      <div className="server-info-modal">
        <div className="left-arrow"></div>
        <div className="server-info">{server.name}</div>
      </div>
    </div>
  );
};

export default ServerCard;
