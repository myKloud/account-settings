import React, { useState, useEffect } from "react";
import icon from "../../images/app-logo.png";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Localization from "./localization";
import image from "../../images/app-logo.png";
import "./style.scss";
import { AiFillHome, AiTwotoneSetting } from "react-icons/ai";
import { IoIosHelpCircle } from "react-icons/io";

const LeftPanel = (props) => {
  const { leftPanelVisibility } = props;
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
        // style={
        //   !leftPanelVisibility
        //     ? { visibility: "hidden" }
        //     : {
        //         visibility: "visible important",
        //         width: "268px",
        //         "padding-left": "37px",
        //       }
        // }
        className={"leftPanel_container"}
      >
        <div className="mykloud_logo"></div>
        <div className="leftPanel_button">
          <AiFillHome size="24px" />
          {/* <img src={image} width="17px" height="20px"></img> */}
          <button
            onClick={() => {
              nextPage("home");
            }}
            className="leftPanel_text"
          >
            Home
          </button>
        </div>

        <div className="leftPanel_button">
          {/* <img src={image} width="17px" height="20px"></img> */}
          <AiTwotoneSetting color="rgb(27,105,216)" size="24px" />

          <button
            className="leftPanel_text"
            onClick={() => {
              nextPage("settings");
            }}
            style={{ color: "rgb(27,105,216)" }}
          >
            Settings
          </button>
        </div>
        <div className="leftPanel_button">
          <IoIosHelpCircle size="24px" />
          {/* <img src={image} width="17px" height="20px"></img> */}
          <button
            className="leftPanel_text"
            onClick={() => {
              nextPage("help");
            }}
          >
            Help
          </button>
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

{
  /* {home ? (
          <div className="setting_container">
            <h1>Home</h1>
            <div className="settingDetails_container">
              <div></div>
              <div>Home</div>
              <div>Home</div>
            </div>
          </div>
        ) : subscription ? (
          <div className="setting_container">
            <h1>subscription</h1>
            <div className="settingDetails_container">
              <div>subscription</div>
              <div>subscription</div>
            </div>
          </div>
        ) : settings ? (
          <div className="setting_container">
            <h1>Settings</h1>
            <div className="settingDetails_container">
              <div></div>
              <div>Settings</div>
              <div>Settings</div>
            </div>
          </div>
        ) : (
          <div className="setting_container">
            <h1>help</h1>
            <div className="settingDetails_container">
              <div></div>
              <div>help</div>
              <div>help</div>
            </div>
          </div>
        )} */
}
