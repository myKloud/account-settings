import "./myKloudAccount.scss";

// Component
import AccountSettingProfile from "./myKloudAccountProfile";
import MyKloudAccountPassword from "./myKloudAccountPassword";
import MyKloudAccountRecovery from "./myKloudAccountRecovery";

const MyKloudAccount = () => {
  return (
    <div className="myKloud-account-container">
      <AccountSettingProfile />
      <MyKloudAccountPassword />
      <MyKloudAccountRecovery />
    </div>
  );
};

export default MyKloudAccount;
