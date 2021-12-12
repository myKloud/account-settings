import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { getStorage } from "../src/config/storage";
import LeftPanel from "./components/LeftPanel";
import AccountSetting from "./components/Settings";

function App() {
  const history = useHistory();
  const storage = getStorage();
  //
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
      <Switch>
        <Route exact path="/" render={() => <AccountSetting />} />
      </Switch>
    </>
  );
}

export default App;
