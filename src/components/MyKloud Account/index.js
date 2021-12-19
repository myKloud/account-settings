import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Localization from "./localization";
import passIMG from "../../images/password.svg";
import recvIMG from "../../images/account recoverysvg.svg";
import { CgProfile } from "react-icons/cg";
import blackEmailImg from "../../images/email1.png";
import whiteEmailImg from "../../images/email2.png";
import blackPhoneImg from "../../images/phone1.png";
import whitePhoneImg from "../../images/phone2.png";
import Validation from "../common/validation";
import { setUserObj } from "../../actions/userAction";
import { setOTP } from "../../actions/otpAction";
import { setStorage } from "../../config/storage";
import { generateOTP } from "../../config/util";
import { sendOtp } from "../../services/register";

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
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");
  const [showCode, setShowCode] = useState(false);
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const form_validation = {
    email: {
      name: "email",
      required: Localization.validation.email.required,
      redundant: Localization.validation.email.redundant,
    },
    number: {
      name: "number",
      required: Localization.validation.number.required,
    },
  };
  const handleSetMethod = (type) => {
    setNumberMessage("");
    setEmailMessage("");
    setMethod(type);
  };

  const validate = (input, value) => {
    let is_valid = true;
    const domain = ["mykmail.io", "mykloudmail.io", "mkmail.io"];

    if (input.name === "email") {
      setEmailMessage("");

      if (!value.length) {
        setEmailMessage(input.required);
        is_valid = false;
      } else if (!validEmail.test(email)) {
        setEmailMessage(input.required);
        is_valid = false;
      } else if (
        domain.includes(email.slice(email.indexOf("@") + 1).toLowerCase())
      ) {
        setEmailMessage(input.redundant);
        is_valid = false;
      }
    }

    if (input.name === "number") {
      setNumberMessage("");

      if (!value.length) {
        setNumberMessage(input.required);
        is_valid = false;
      }
      //  else if (!isValidPhoneNumber(`+${number}`)) {
      //     setNumberMessage(input.required);
      //     is_valid = false;
      // }
    }

    return is_valid;
  };

  const validateHandler = () => {
    const is_valid_email = validate(form_validation.email, email);
    const is_valid_number = validate(form_validation.number, number);

    return is_valid_email || is_valid_number;
  };

  const nextPage = async () => {
    const is_valid = validateHandler();
    if (is_valid) {
      const user_obj = props.userReducer;
      user_obj.method = method;
      user_obj.recovery = method === "email" ? email : number;

      const otp = generateOTP();

      props.dispatch(setOTP(otp));
      setUserObj(user_obj);
      setStorage("verification");

      let send = false;

      send = await sendOtp({
        value: method === "email" ? email : `+${number}`,
        otp: otp,
      });

      if (send) {
        setShowCode(true);
        // history.push({
        //   pathname: "/verification",
        //   state: {
        //     value: method === "email" ? email : `+${number}`,
        //     method: method,
        //   },
        // });
      }
    }
  };
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
        {!showCode ? (
          <div className="recovery_container">
            <div className="form_wrapper">
              <div className="form_sub_content">
                <div className="button_container">
                  <div
                    className={
                      method === "email"
                        ? "select_button selected"
                        : "select_button"
                    }
                    onClick={() => {
                      handleSetMethod("email");
                    }}
                  >
                    <div
                      className={method === "email" ? "logo white_img" : "logo"}
                    >
                      <img
                        src={method === "email" ? whiteEmailImg : blackEmailImg}
                        alt="email logo"
                      />
                    </div>

                    <p className="text">
                      {Localization.email_address}Email address
                    </p>
                  </div>

                  <div
                    className={
                      method === "email"
                        ? "select_button"
                        : "select_button selected"
                    }
                    onClick={() => {
                      handleSetMethod("phone");
                    }}
                  >
                    <div
                      className={method === "email" ? "logo" : "logo white_img"}
                    >
                      <img
                        src={method === "email" ? blackPhoneImg : whitePhoneImg}
                        alt="phone"
                      />
                    </div>

                    <p className="text">Phone Number</p>
                  </div>
                </div>
                <p className="p-1">Change recovery method</p>

                {method === "email" ? (
                  <div className="user_name mb-2">
                    <div
                      style={{ "flex-direction": "column" }}
                      className="form_container"
                    >
                      <Input
                        type="text"
                        autoFocus={true}
                        value={email}
                        onChange={(e) => {
                          setEmail(e);
                          // validate(
                          //     form_validation.email,
                          //     e
                          // );
                        }}
                        className={`recovery_input ${
                          emailMessage && "validation"
                        }`}
                        placeholder={"Email here"}
                      />
                      {emailMessage && <Validation error={emailMessage} />}
                    </div>
                    <p className="p-2">
                      You'll recive an email with confirmation code
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="wrapper mb-2">
                      {/* <ReactPhoneInput
                                            inputExtraProps={{
                                                name: "phone",
                                                required: true,
                                                autoFocus: true,
                                            }}
                                            inputClass={`phone_input ${
                                                numberMessage && "validation"
                                            }`}
                                            buttonClass={`country_dropdown ${
                                                numberMessage && "validation"
                                            }`}
                                            value={number}
                                            onChange={(e) => {
                                                setNumber(e);
                                                // validate(form_validation.number, e);
                                            }}
                                            country={"us"}
                                        /> */}

                      {/* {numberMessage && (
                                            <Validation error={numberMessage} />
                                        )} */}
                    </div>
                  </>
                )}

                <p className="note mb-8">
                  {method === "email"
                    ? Localization.email_msg
                    : Localization.sms_msg}
                </p>
                <div className="send-code">
                  <button className="next_btn" onClick={nextPage}>
                    send Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* ////////////////////////////// */}
        {/* <div className="account-recovery-method">
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
                </div> */}
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
