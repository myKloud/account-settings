import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { getStorage } from "./config/storage";
import AccountSetting from "./components/accountSetting";

function App() {
  const history = useHistory();
  const storage = getStorage();
  //
  const pathChecker = () => {
    if (storage === null || !storage.isvalid) {
      history.push({
        pathname: "/accountSettings",
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
        <Route
          exact
          path="/accountSettings"
          render={() => <AccountSetting />}
        />
      </Switch>
    </>
  );
}

export default App;
