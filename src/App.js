import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { getStorage } from "./config/storage";
import AccountSetting from "./components/accountSetting";
import Settings from "./components/asettings";

function App() {
  return (
    <>
      <Switch>
        <Route path="/accountSettings" render={() => <AccountSetting />} />
        <Route path="/settings" render={() => <Settings />} />
      </Switch>
    </>
  );
}

export default App;
