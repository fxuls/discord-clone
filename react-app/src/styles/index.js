import "./reset.css";
import "./themes.css";
import "./index.css";
import "./navigation.css";
import "./server-nav.css";
import "./app.css";
import "./nav-bars.css";
import "./friends.css";
import "./homepage.css";
import "./messages.css";
import "./headers.css";
import "./modals.css";

export const colors = [
  "#5865F2", // Blurple
  "#02C39A", // Green
  "#F7B801", // Yellow
  "#EB459E", // Fuscsia
  "#FF0A54", // Red
  "#9D4EDD", // Purple
];

export const getRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];
