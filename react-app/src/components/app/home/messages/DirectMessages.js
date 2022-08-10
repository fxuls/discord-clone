import { useSelector } from "react-redux";
import { uiDirectMessageIdSelector } from "../../../../store/ui";

import DirectMessagesHeader from "./DirectMessagesHeader";
import DirectMessageChatBox from "./DirectMessageChatBox";

const DirectMessages = ({ loaded }) => {
  const uiDirectMessageId = useSelector(uiDirectMessageIdSelector);
  
  if (!loaded) return null;

  return (
    <div className="direct-messages-container main left-inset-shadow">
      <DirectMessagesHeader />

      <div className="direct-messages header-box-shadow">
        Direct messages here
      </div>

      <DirectMessageChatBox />
    </div>
  );
};

export default DirectMessages;
