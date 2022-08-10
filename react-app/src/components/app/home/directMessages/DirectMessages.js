import DirectMessagesHeader from "./DirectMessagesHeader";

const DirectMessages = ({ loaded }) => {
  if (!loaded) return null;

  return (
    <div className="direct-messages-container main left-inset-shadow">
      <DirectMessagesHeader />

      <div className="direct-messages header-box-shadow">
        Direct messages here
      </div>

      <div className="chatbox">Chatbox</div>
    </div>
  );
};

export default DirectMessages;
