import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from "./components/AuthUser";
import Auth from "./navbar/auth";
import Guest from "./navbar/guest";

function App() {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <Guest />;
  }
  return <Auth />;
}

export default App;
