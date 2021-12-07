import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { getStorage } from "../src/config/storage";
import Header from "./components/header";
import Footer from "./components/footer";
import Register from "./components/register";

function App() {
  const history = useHistory();
  const storage = getStorage();

  const pathChecker = () => {
    if (storage === null || !storage.isvalid) {
      history.push({
        pathname: "/",
      });
    } else {
      history.push({
        pathname: `${storage}`,
      });
    }
  };

  pathChecker();
  return (
    <>
      <div className="app m-8">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Register />} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
