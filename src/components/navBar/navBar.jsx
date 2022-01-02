import React from "react";
import { connect } from "react-redux";
import Localization from "./localization";
import { useHistory } from "react-router-dom";
import "./style.scss";

const NavBar = (props) => {
  console.log("props", props);
  const history = useHistory();
  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <div className="nav-fixed">
      <nav className="settings-bar">
        <div className="logo-mobile"></div>
        <div className="mobile-response">
          {!props.notShow === "notShow"
            ? ""
            : Localization.myKloudAccountSettings}
        </div>
        <div
          className="setting-dotes"
          onClick={() => {
            history.push("./settings");
          }}
        ></div>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ languageReducer, userReducer, otpReducer }) => ({
  languageReducer,
  userReducer,
  otpReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
