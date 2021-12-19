import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Localization from "./localization";
import LeftPanel from "../LeftPanel";
import TopPanel from "../TopPanel";

import "./style.scss";
import MyKloudAccount from "../MyKloud Account";

const AccountSetting = (props) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {});

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);
  return (
    <>
      <section className="main_container">
        <LeftPanel setShow={setShow} show={show} />
        <div className="raight-panel-container">
          <TopPanel />
          <section className="setting_container">
            <div className="nav-fixed">
              <nav className="settings_bar">
                <div className="logo-mobile"></div>
                <div
                  className="mobile-response"
                  style={{
                    "font-weight": "600",
                    "font-size": "20px",
                  }}
                >
                  myKloud Account Settingss
                </div>
                <div className="setting_dotes">x</div>
              </nav>
            </div>
            <section className={`setting_main_container`}>
              <MyKloudAccount />
            </section>
          </section>
        </div>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
