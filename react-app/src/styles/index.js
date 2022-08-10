import "./reset.css";
import "./themes.css";
import "./index.css";
import "./navigation.css";
import "./server-nav.css";
import "./app.css";
import "./nav-bars.css";
import "./friends.css";
import "./home.css";
import "./messages.css";
import "./headers.css";

export const colors = [
  "#5865F2", // Blurple
  "#02c39a", // Green
  "#f7b801", // Yellow
  "#EB459E", // Fuscsia
  "#ED4245", // Red
  "#7209b7", // Purple
];

export const getRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];
