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
import isEmail from "validator/lib/isEmail";

const MyKloudAccount = (props) => {
    const history = useHistory();
    const location = useLocation();

    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const [showPasswordDetails, setShowPasswordDetails] = useState(false);
    const [showRecoveryDetails, setShowRecoveryDetails] = useState(false);
    const [showEmailRecovery, setShowEmailRecovery] = useState(true);
    const [isEmailActive, setIsEmailActive] = useState(true);
    const [showPohneRecovery, setShowPohneRecovery] = useState(false);
    const [isPhoneActive, setIsPhoneActive] = useState(false);

    const { lang } = props.languageReducer;
    Localization.setLanguage(lang);

    return (
        <div className="myKloud_account_container">
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
                <input
                    placeholder={Localization.profileDetails.lastName}
                ></input>
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
                <input
                    placeholder={Localization.profileDetails.lastName}
                ></input>
            </div>
            {/* //////////////////////////////////////////////////// */}
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
                <div className="account-recovery-method">
                    <div
                        onClick={() => {
                            setShowEmailRecovery(!showEmailRecovery);
                            setIsEmailActive(!isEmailActive);
                            setShowPohneRecovery(false);
                            setIsPhoneActive(false);
                        }}
                        className={`account-recovery-box ${
                            isEmailActive ? "account-recovery-box-active" : ""
                        } `}
                    >
                        <img></img>
                        <div>Email Adress</div>
                    </div>
                    <div
                        onClick={() => {
                            setShowPohneRecovery(!showPohneRecovery);
                            setIsPhoneActive(!isPhoneActive);
                            setShowEmailRecovery(false);
                            setIsEmailActive(false);
                        }}
                        className={`account-recovery-box ${
                            isPhoneActive ? "account-recovery-box-active" : ""
                        } `}
                    >
                        <img></img>
                        <div>Phone Number</div>
                    </div>
                </div>
                <div className={showEmailRecovery ? "show" : "hide"}>
                    <p className="p-1">Change recovery method</p>
                    <input
                        value="mohammadEmad@yauoo.com"
                        style={{ "margin-top": "22px" }}
                    ></input>
                    <p className="p-2">
                        You'll recive an email with confirmation code
                    </p>
                </div>

                <div className={showPohneRecovery ? "show" : "hide"}>
                    <div>
                        <div>
                            <div className="Recovery-phone-number">
                                <select>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Jordan">Jordan</option>
                                </select>
                                <input
                                    value="mohammadEmad@yauoo.com"
                                    style={{ "margin-top": "22px" }}
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
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
