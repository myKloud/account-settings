import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Localization from "./localization";
import "./style.scss";

const LeftPanel = (props) => {
  const { show, setShow } = props;
  const history = useHistory();
  const location = useLocation();

  const nextPage = (next) => {
    history.push({
      pathname: `/${next}`,
    });
  };

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);
  return (
    <>
      <div
        className={`${show ? "show-left" : "hide-left"} leftPanel_container`}
      >
        <div className="mykloud_logo"></div>
        <div className="left-panel">
          <div className="first-container">
            <div className="Back-to-menu">
              <div className="back"></div>
              <div>back to menu</div>
            </div>
            <div className="leftPanel_button">
              <div className="left-panel-icon"></div>
              <Link
                to={{
                  pathname: "/",
                }}
                className="leftPanel_text"
              >
                Kmail settings
              </Link>
            </div>
            <div className="leftPanel_button">
              <div className="left-panel-icon"></div>
              <Link
                to={{
                  pathname: "/",
                }}
                className="leftPanel_text"

                // style={{ color: "rgb(27,105,216)" }}
              >
                Account Settings
              </Link>
            </div>
            <div className="leftPanel_button">
              <div className="left-panel-icon"></div>
              <Link
                to={{
                  pathname: "/",
                }}
                className="leftPanel_text"
              >
                Help
              </Link>
            </div>
            <div className="leftPanel_button">
              <div className="left-panel-icon"></div>
              <Link
                to={{
                  pathname: "/",
                }}
                className="leftPanel_text"
              >
                Legal
              </Link>
            </div>
          </div>
          <div className="storage">
            <p>Storage</p>
            <p>.................</p>
            <p>.................</p>
            <p>.................</p>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ languageReducer, userReducer }) => ({
  languageReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
