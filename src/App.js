import { Route, Switch, Redirect } from "react-router-dom";
import AccountSetting from "./components/accountSetting";
import Settings from "./components/settings/Settings";

function App() {
  return (
    <>
      <Switch>
        <Route path="/accountSettings" render={() => <AccountSetting />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route exact path="/">
          <Redirect to="/accountSettings" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
