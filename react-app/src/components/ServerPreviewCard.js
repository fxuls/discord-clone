import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sessionUserSelector } from "../store/session";
import { joinServerById, joinedServersIdsSelector } from "../store/servers";
import { setServer } from "../store/ui";

const ServerPreviewCard = ({ server }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(sessionUserSelector);
  const joinedServerIds = useSelector(joinedServersIdsSelector);

  const initials = server.name.split(" ").map((word) => word[0]);

  const onJoin = async () => {
    // if not authenticated
    if (!sessionUser) return history.push("/sign-in");

    const response = await dispatch(joinServerById(server.id));
    if (response.id) {
      await dispatch(setServer(server.id));
      history.push("/app");
    }
  };

  const onOpen = async () => {
    // if not authenticated
    if (!sessionUser) return history.push("/sign-in");

    await dispatch(setServer(server.id));
    history.push("/app");
  };

  return (
    <div className="server-preview-card">
      {server.server_image_url ? (
        <img
          alt="Server icon"
          className="server-preview-icon unselectable"
          src={server.server_image_url}
        />
      ) : (
        <h1 className="server-preview-icon transparent-caret-color">
          {initials.slice(0, 2).join("")}
        </h1>
      )}

      <h2 className="server-name">{server.name}</h2>

      <p className="member-count">{server.member_count + " members"}</p>

      {joinedServerIds?.includes(server.id + "") ? (
        <button onClick={onOpen}>Open</button>
      ) : (
        <button onClick={onJoin}>Join</button>
      )}
    </div>
  );
};

export default ServerPreviewCard;
