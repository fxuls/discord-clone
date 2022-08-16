import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCodeBranch,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";


const HomeFooter = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-header">
          <img
            className="footer-logo"
            src="/assets/discord-logo-banner.png"
            alt="Discord logo banner"
          />
        </div>

        <ul className="footer-list">
          <li>
            <h1>About</h1>
            <div className="footer-links">
              <a href="https://discord.com" target="_blank">
                Original site
                <FontAwesomeIcon icon={faLink} />
              </a>

              <a href="https://github.com/fxuls/discord-clone" target="_blank">
                Source code
                <FontAwesomeIcon icon={faCodeBranch} />
              </a>

              <a
                href="https://github.com/fxuls/discord-clone/wiki"
                target="_blank"
              >
                Project documentation
                <FontAwesomeIcon icon={faBook} />
              </a>
            </div>
          </li>

          <li>
            <h1>Developer</h1>
            <div className="footer-links">
              <a href="https://github.com/fxuls" target="_blank">
                Github
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/austin-schmigel-420a8a12b"
                target="_blank"
              >
                LinkedIn
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default HomeFooter;
