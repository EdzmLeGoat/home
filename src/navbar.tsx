import darkLogo from "./assets/darklogo.svg";

export default function NavBar() {
  return (
    <nav>
      <a href="/home">
        <img src={darkLogo} alt="" />
      </a>
      <h1>Edzm's Games</h1>
    </nav>
  );
}
