import "./App.css";
import ctfImage from "./assets/ctf.png";
import pordleDarkLogo from "./assets/pordledarklogo.png";
import NavBar from "./navbar";
//root page is now /home since i'm hosting from github pages and the repo is named home
export default function App() {
  return (
    <body>
      <NavBar />
      <ul>
        <div className="card-container">
          <div className="game-card" id="ctf-card">
            <li>
              <a href="/home/ctf/ctf.html">
                <img src={ctfImage} alt="Capture The Flag" />
                <h2>Capture The Flag</h2>
              </a>
              <p>2 or 3 Players!</p>
            </li>
          </div>
          <div className="game-card" id="pordle-card">
            <li>
              <a href="/home/pordle">
                <img id="pordle-image" src={pordleDarkLogo} alt="Pordle" />
                <h2>Pordle</h2>
              </a>
              <p>Single Player</p>
            </li>
          </div>
          <div className="game-card incomplete">
            <p>Coming Soon!</p>
          </div>
        </div>
      </ul>
    </body>
  );
}
