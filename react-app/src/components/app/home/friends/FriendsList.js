import FriendCard from "./FriendCard";

const FriendsList = ({ friends }) => {
  return (
    <div className="friends header-box-shadow">
      <h1 className="sub-header-text">{`Friends — ${friends.length}`}</h1>

      <ul className="friends-list">
        {friends.map((user) => (
          <li key={user.id}>
            <div className="list-seperator" />
            <FriendCard userId={user.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
