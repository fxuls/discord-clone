import { useState } from "react";
import { useDispatch } from "react-redux";
import { friendUserByUsername } from "../../../../store/users";

const AddFriend = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState("");

  const isUsernameValid = () => /^.{3,40}#[0-9]{4}$/.test(username);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isUsernameValid()) return;

    const response = await dispatch(friendUserByUsername(username));
    setResponseMessage(response.message);
    setResponseStatus(response.status_code);
  };

  return (
    <div className="add-friend header-box-shadow">
      <form onSubmit={onSubmit}>
        <h1>Add friend</h1>
        <p>You can add a friend by entering their username here.</p>
        <input
          name="username"
          type="text"
          placeholder="Dino#0924"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="foot-bar">
          <button type="submit" active={isUsernameValid() + ""}>
            Send
          </button>

          {responseMessage && <p className={responseStatus < 300 ? "" : "error"}>{responseMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddFriend;
