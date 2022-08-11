import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const DirectMessageChatBox = ({ userName }) => {
  const [messageText, setMessageText] = useState("");

  const onSendMessage = (e) => {
    e.preventDefault();

    console.log("Submit ", messageText);
  };
  return (
    <div className="chat-box">
      <form
        className="send-message-form"
        onSubmit={onSendMessage}
        autoComplete="off"
      >
        <input
          type="text"
          name="messageText"
          value={messageText}
          placeholder={`Message @${userName}`}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <input type="submit" style={{ display: "none" }} />
      </form>
    </div>
  );
};

export default DirectMessageChatBox;
