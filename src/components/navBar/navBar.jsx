import React from "react";
import { connect } from "react-redux";
import Localization from "./localization";
import "./style.scss";

const NavBar = (props) => {
  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <div className="nav-fixed">
      <nav className="settings-bar">
        <div className="logo-mobile"></div>
        <div className="mobile-response">
          {Localization.myKloudAccountSettings}
        </div>
        <div className="setting-dotes"></div>
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
