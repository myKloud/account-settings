import React, { useState } from "react";
import { connect } from "react-redux";
import Localization from "./localization";
import LeftPanel from "../leftPanel";
import TopPanel from "../topPanel";
import NavBar from "../navBar";

import "./style.scss";
import MyKloudAccount from "../myKloudAccount";

const AccountSetting = (props) => {
  const [show, setShow] = useState(false);

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
