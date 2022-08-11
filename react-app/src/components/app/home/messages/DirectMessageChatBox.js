import { useState } from "react";
import { useDispatch } from "react-redux";

import { sendDirectMessage } from "../../../../store/directMessages";

const DirectMessageChatBox = ({ partnerId, userName }) => {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");

  const onSendMessage = async (e) => {
    e.preventDefault();

    dispatch(sendDirectMessage({ recipientId: partnerId, text: messageText }));

    // reset input box
    setMessageText("");
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
