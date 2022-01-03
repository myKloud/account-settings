import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Localization from "./localization";
import LeftPanel from "../leftPanel";
import TopPanel from "../topPanel";
import NavBar from "../navBar";
import "./asettings.scss";
import MyKloudAccount from "../myKloudAccount";
import { useHistory } from "react-router-dom";
const Settings = (props) => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <div className="main-settings">
      <div className="nav-fixed">
        <nav className="settings-bar">
          <div className="logo-mobile"></div>
          <div className="mobile-response"></div>
          <div
            className="setting-dotes"
            onClick={() => {
              history.push("./settings");
            }}
          ></div>
        </nav>
      </div>
      <section className="main-container">
        <LeftPanel setShow={setShow} show={show} />
        <div className="right-panel-container">
          <TopPanel />
          <section className="setting-container">
            <NavBar />
            <MyKloudAccount />
          </section>
        </div>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
