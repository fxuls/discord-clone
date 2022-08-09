const FriendCard = ({ user }) => {
  const username = user.username.split("#");

  return (
    <div className="friend-card">
      <div className="friend-icon">
        {user.profile_image_url ? (
          <img className="friend-icon" src={user.profile_image_url} />
        ) : (
          <div
            className="default-image-container"
            style={{ backgroundColor: user.color }}
          >
            <img className="friend-icon" src="/assets/default-user.png" />
          </div>
        )}
      </div>

      <div className="info">
        <span className="name">{username[0]}</span>
        <span className="numbers">{"#" + username[1]}</span>
      </div>
    </div>
  );
};

export default FriendCard;
