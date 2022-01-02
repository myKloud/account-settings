import React from "react";
import { connect } from "react-redux";
import Localization from "./localization";
import "./style.scss";

const TopPanel = (props) => {
  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

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
