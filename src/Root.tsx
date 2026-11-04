import App from "./App";
import Pordle from "./pordle";

export default function Root() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/home/pordle") {
    return <Pordle />;
  }

  return <App />;
}
