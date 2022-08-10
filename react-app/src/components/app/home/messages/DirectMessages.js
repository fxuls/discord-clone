import { useSelector } from "react-redux";
import { uiDirectMessageIdSelector } from "../../../../store/ui";
import { directMessageChatSelector, directMessagesSelector } from "../../../../store/directMessages";
import { userSelector } from "../../../../store/users";

import DirectMessagesHeader from "./DirectMessagesHeader";
import DirectMessageChatBox from "./DirectMessageChatBox";

const DirectMessages = ({ loaded }) => {
  const uiDirectMessageId = useSelector(uiDirectMessageIdSelector);
  const chat = useSelector(directMessageChatSelector(uiDirectMessageId));
  const user = useSelector(userSelector(chat.userId));

  if (!loaded) return null;

  return (
    <div className="direct-messages-container main left-inset-shadow">
      <DirectMessagesHeader user={user} />

      <div className="direct-messages header-box-shadow">
        Direct messages here
      </div>

      <DirectMessageChatBox />
    </div>
  );
};

export default DirectMessages;
