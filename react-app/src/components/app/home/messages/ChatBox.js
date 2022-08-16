import { useState } from "react";

const ChatBox = ({ sendMessage, placeholder }) => {
  const [messageText, setMessageText] = useState("");

  const onSendMessage = (e) => {
    e.preventDefault();

    if (messageText.trim().length === 0 || messageText.length > 700) return;

    sendMessage(messageText);
    //reset input box
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
          placeholder={placeholder}
          onChange={(e) => {
            if (e.target.value.length <= 700) setMessageText(e.target.value);
          }}
        />

        <input type="submit" style={{ display: "none" }} />
      </form>
    </div>
  );
};

export default ChatBox;
