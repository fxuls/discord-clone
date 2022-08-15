import FriendCard from "./FriendCard";

const FriendsList = ({ friends }) => {
  return (
    <div className="shadow-container header-box-shadow">
      <div className="friends">
        <h1 className="sub-header-text unselectable">{`Friends — ${friends.length}`}</h1>

        <ul className="friends-list">
          {friends.map((user) => (
            <li key={user.id}>
              <div className="list-seperator" />
              <FriendCard userId={user.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsList;
