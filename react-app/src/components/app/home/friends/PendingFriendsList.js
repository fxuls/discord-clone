import FriendCard from "./FriendCard";

const PendingFriendsList = ({ friendRequests }) => {
  return (
    <div className="shadow-container header-box-shadow">
      <div className="friends">
        <h1 className="sub-header-text unselectable">{`Incoming — ${friendRequests.incoming.length}`}</h1>
        <ul className="friends-list incoming">
          {friendRequests.incoming.map((userId) => (
            <li key={userId}>
              <div className="list-seperator" />
              <FriendCard userId={userId} type="incoming" />
            </li>
          ))}
        </ul>

        <h1 className="sub-header-text unselectable">{`Sent — ${friendRequests.sent.length}`}</h1>
        <ul className="friends-list incoming">
          {friendRequests.sent.map((userId) => (
            <li key={userId}>
              <div className="list-seperator" />
              <FriendCard userId={userId} type="sent" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PendingFriendsList;
