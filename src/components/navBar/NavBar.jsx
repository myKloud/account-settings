import React, { useEffect } from "react";
import { connect } from "react-redux";
import Localization from "./localization";
import { useHistory } from "react-router-dom";
import "./style.scss";

const NavBar = (props) => {
  const history = useHistory();
  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

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
