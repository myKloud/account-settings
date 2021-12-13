import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Localization from "./localization";
import LeftPanel from "../LeftPanel";
import passIMG from "../../images/password.svg";
import recvIMG from "../../images/account recoverysvg.svg";

import "./style.scss";
import { CgProfile } from "react-icons/cg";
import { MdArrowForwardIos } from "react-icons/md";
import MyKloudAccount from "../MyKloud Account";

const AccountSetting = (props) => {
  const [leftPanelVisibility, setLeftPanelVisibility] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {});

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);
  return (
    <>
      <section className="main_container form_container">
        <LeftPanel leftPanelVisibility={leftPanelVisibility} />
        <section className="setting_container">
          <nav className="settings_bar">
            <span style={{ "font-weight": "600", "font-size": "20px" }}>
              Settings
            </span>
            <div className="setting_dotes">...</div>
          </nav>
          <section className="setting_main_container">
            <MyKloudAccount />
            <div className="myKloud_others_container">
              <div style={{ "margin-bottom": "3px" }}>Others</div>
              <div className="box">
                <CgProfile size="24px" color="rgb(27,105,216)" />
                <div>Device access</div>
              </div>
              <div className="box">
                <CgProfile size="24px" color="rgb(27,105,216)" />
                <div>Language preference</div>
              </div>
              <div className="box">
                <CgProfile size="24px" color="rgb(27,105,216)" />
                <div>About</div>
              </div>
            </div>
          </section>
        </section>
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
