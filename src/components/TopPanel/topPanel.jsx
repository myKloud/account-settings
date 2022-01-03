import React, { useEffect } from "react";
import { connect } from "react-redux";
import Localization from "./localization";
import "./topPanel.scss";

const TopPanel = (props) => {
  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <div className="TopPanel-container">
      <button className="upgrade-button">{Localization.upgrade}</button>
      <div className="top-panel-icon-setting"></div>
      <div className="top-panel-icon-help"></div>
      <div className="top-panel-name-icon">
        <div>{Localization.am}</div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel);
