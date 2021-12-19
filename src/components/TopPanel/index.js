import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Localization from "./localization";
import "./style.scss";

const TopPanel = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);
  return (
    <div className="TopPanel-container">
      <button className="upgrage-button">Upgrade</button>
      <div style={{ width: "20px", height: "20px", background: "black" }}></div>
      <div style={{ width: "20px", height: "20px", background: "black" }}></div>
      <div className="name-icon">
        <div>AM</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ languageReducer, userReducer }) => ({
  languageReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel);
