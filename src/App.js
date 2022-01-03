import { Route, Switch } from "react-router-dom";
import AccountSetting from "./components/accountSetting";
import Settings from "./components/settings/settings";

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
