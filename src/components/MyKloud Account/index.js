import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Localization from "./localization";
import passIMG from "../../images/password.svg";
import recvIMG from "../../images/account recoverysvg.svg";
import { CgProfile } from "react-icons/cg";
import "./style.scss";

// Component
import Input from "../common/input";

const MyKloudAccount = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
  const [showRecoveryDetails, setShowRecoveryDetails] = useState(false);

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <div className="myKloud_account_container">
      <div style={{ "margin-bottom": "3px" }}>{Localization.title}</div>
      <div
        className="box"
        onClick={() => {
          setShowProfileDetails(!showProfileDetails);
        }}
      >
        <CgProfile size="24px" color="rgb(27,105,216)" />
        {Localization.profile}
      </div>
      <div className={showProfileDetails ? "show" : "hide"}>
        <input
          style={{ display: "block" }}
          placeholder={Localization.profileDetails.firstName}
        ></input>
        <input placeholder={Localization.profileDetails.lastName}></input>
      </div>

      {/*  */}
      <div
        className="box"
        onClick={() => {
          setShowPasswordDetails(!showPasswordDetails);
        }}
      >
        <img src={passIMG} width="24" height="24"></img>
        <div>Password</div>
      </div>
      <div className={showPasswordDetails ? "show" : "hide"}>
        <input
          style={{ display: "block" }}
          placeholder={Localization.profileDetails.firstName}
        ></input>
        <input placeholder={Localization.profileDetails.lastName}></input>
      </div>

      <div
        className="box"
        onClick={() => {
          setShowRecoveryDetails(!showRecoveryDetails);
        }}
      >
        <img src={recvIMG} width="24" height="24"></img>
        <div>Account recovery</div>
      </div>
      <div className={showRecoveryDetails ? "show" : "hide"}>
        <input
          style={{ display: "block" }}
          placeholder={Localization.profileDetails.firstName}
        ></input>
        <input placeholder={Localization.profileDetails.lastName}></input>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyKloudAccount);
