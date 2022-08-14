import NavBar from "./navigation/NavBar";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="bg-color-box">
        <NavBar />
        <div className="homepage-header">
          <h1>Imagine a place...</h1>
          <p>
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>
        </div>
      </div>

      <div className="homepage-servers header-box-shadow">
        The servers to join will go here
      </div>
    </div>
  );
};

export default HomePage;
