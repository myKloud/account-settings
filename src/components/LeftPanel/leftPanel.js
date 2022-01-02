import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Localization from "./localization";
import "./style.scss";

const LeftPanel = (props) => {
  const { lang } = props.languageReducer;
  const [visited, setVisited] = useState("accountSettings");

  const visitedButton = (button) => {
    setVisited(button);
  };

  Localization.setLanguage(lang);

  return (
    <>
      <div className="leftPanel-container">
        <div className="mykloud-logo"></div>
        <div className="left-panel">
          <div className="first-container">
            <div className="Back-to-menu">
              <div className="back"></div>
              <div>{Localization.backToKmail}</div>
            </div>
            <div
              className={`${
                visited == "kmailSettings" ? "activeButton" : ""
              } leftPanel-button`}
              onClick={() => {
                visitedButton("kmailSettings");
              }}
            >
              <div className="left-panel-icon-kmailSetting"></div>
              <Link
                to={{
                  pathname: "/accountSettings",
                }}
                className="leftPanel-text"
              >
                {Localization.list.topList.kmailSettings}
              </Link>
            </div>
            <div
              className={`${
                visited === "accountSettings" ? "activeButton" : ""
              } leftPanel-button`}
              onClick={() => {
                visitedButton("accountSettings");
              }}
            >
              <div className="left-panel-icon-accountSetting"></div>
              <Link
                to={{
                  pathname: "/accountSettings",
                }}
                className="leftPanel-text"
              >
                {Localization.list.topList.accountSettings}
              </Link>
            </div>
            <div
              className={`${
                visited == "help" ? "activeButton" : ""
              } leftPanel-button`}
              onClick={() => {
                visitedButton("help");
              }}
            >
              <div className="left-panel-icon-help"></div>
              <Link
                to={{
                  pathname: "/",
                }}
                className="leftPanel-text"
              >
                {Localization.list.topList.help}
              </Link>
            </div>
            <div
              className={`${
                visited == "legal" ? "activeButton" : ""
              } leftPanel-button`}
              onClick={() => {
                visitedButton("legal");
              }}
            >
              <div className="left-panel-icon-legal"></div>
              <Link
                to={{
                  pathname: "/",
                }}
                className="leftPanel-text"
              >
                {Localization.list.topList.legal}
              </Link>
            </div>
          </div>
          <div className="storage-container">
            <div className="left-panel-storage">
              <section className="storage">
                <div className="storage-logo">
                  <div className="logo"></div>
                  <p>{Localization.list.storage.storage}</p>
                </div>
                <div className="storage-percent-container">
                  <div>{Localization.list.storage.percent}</div>
                </div>
              </section>
              <div className="storage-bar">
                <div className="full-spaces"></div>
              </div>
              <p>{Localization.list.storage.fullSpace}</p>
              <button className="upgrade-button">
                {Localization.list.storage.upgrade}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
