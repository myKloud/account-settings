import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Localization from "./../localization";

import blackEmailImg from "../../../images/blackEmail.png";
import whiteEmailImg from "../../../images/whiteEmail.png";
import blackPhoneImg from "../../../images/blackPhone.png";
import whitePhoneImg from "../../../images/whitePhone.png";
import Validation from "../../common/validation";
import { setUserObj } from "../../../actions/userAction";
import { setOTP } from "../../../actions/otpAction";
import { setStorage, getResend, setResend } from "../../../config/storage";
import { generateOTP } from "../../../config/util";
import Verification from "../../codeVerification";
import ReactPhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-input-2/lib/style.css";
import "./myKloudAccountRecovery.scss";

// Component
import Input from "../../common/input";
import formValidation from "./../formValidation";
let interval;

const MyKloudAccountRecovery = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [showRecoveryDetails, setShowRecoveryDetails] = useState(false);
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");
  const [showCode, setShowCode] = useState(false);
  const userObj = props.userReducer;
  const [recovery, setRecovery] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [min, setMin] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const [pre, setPre] = useState(false);
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  let reduxMin = userObj.min;
  let reduxSeconds = userObj.seconds;

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  useEffect(() => {
    const resendStorage = getResend();
    if (reduxMin !== 0) {
      setMin(reduxMin);
    }

    if (reduxSeconds > 0) {
      setSeconds(reduxSeconds);
    }
    if (location.state && reduxMin === 0 && reduxSeconds === 0) {
      let locationMin = location.state.min;
      let locationSeconds = location.state.seconds;
      if (locationSeconds > 0) {
        setSeconds(locationSeconds);
      }

      if (locationMin !== 0) {
        setMin(locationMin);
      }
    } else {
      if (resendStorage === "third" && reduxMin === 0 && reduxSeconds === 0) {
        setMin(15);
        setSeconds(0);
      }
    }
    clearInterval(interval);
    interval = setInterval(() => {
      setIsTimer(true);
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  }, [pre]);

  useEffect(() => {
    if (seconds < 0 && min > 0) {
      setMin((min) => min - 1);
      setSeconds(59);
    }
    if (seconds === 0 && min === 0 && isTimer) {
      clearInterval(interval);
    }
  }, [seconds, min]);

  useEffect(() => {
    userObj.min = min;
  }, [min]);

  useEffect(() => {
    if (seconds >= 0) {
      userObj.seconds = seconds;
    }
  }, [seconds]);

  ///

  const handleSetMethod = (type) => {
    setNumberMessage("");
    setEmailMessage("");
    setMethod(type);
  };

  const validate = (input, value) => {
    let isValid = true;
    const domain = ["mykmail.io", "mykloudmail.io", "mkmail.io"];

    if (input.name == "email") {
      setEmailMessage("");

      if (!value.length) {
        setEmailMessage(input.required);
        isValid = false;
      } else if (!validEmail.test(email)) {
        setEmailMessage(input.required);
        isValid = false;
      } else if (
        domain.includes(email.slice(email.indexOf("@") + 1).toLowerCase())
      ) {
        setEmailMessage(input.redundant);
        isValid = false;
      }
    }

    if (input.name == "number") {
      setNumberMessage("");

      if (!value.length) {
        setNumberMessage(input.required);
        isValid = false;
      } else if (!isValidPhoneNumber(`+${number}`)) {
        setNumberMessage(input.required);
        isValid = false;
      }
    }
    return isValid;
  };

  const validateHandler = () => {
    const isValidEmail = validate(formValidation.email, email);
    const isValidNumber = validate(formValidation.number, number);

    return isValidEmail || isValidNumber;
  };

  const nextPage = async () => {
    const isValid = validateHandler();
    if (isValid) {
      const userObj = props.userReducer;
      userObj.method = method;
      userObj.recovery = method === "email" ? email : number;

      const otp = generateOTP();
      props.dispatch(setOTP(otp));
      await setUserObj(userObj);
      setStorage("verification");

      let send = false;

      if (getResend()) {
        if (getResend() === "second") {
          setResend("third");
        } else if (getResend() === "first") {
          setResend("second");
        }
      } else {
        setResend("first");
      }

      // if (send) {
      setRecovery([method === "email" ? email : `+${number}`, method]);
      history.push({
        pathname: "/accountSettings",
        state: {
          value: method === "email" ? email : `+${number}`,
          method: method,
        },
      });
      setShowCode(true);
      // }
    }
  };
  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="bxo-container">
        <div
          className={`${showRecoveryDetails ? "selected-category" : ""} box`}
          onClick={() => {
            setShowRecoveryDetails(!showRecoveryDetails);
          }}
        >
          <div
            className={`${!showRecoveryDetails ? "arrow" : "rotate-arrow"}`}
          ></div>

          <div className="recovery-icon"></div>

          <div>{Localization.recovery.accountRecovery}</div>
        </div>
        <div className={showRecoveryDetails ? "show" : "hide"}>
          {!showCode ? (
            <div className="recovery-container">
              <div className="form-sub-content">
                <div className="button-container">
                  <div
                    className={
                      method === "email"
                        ? "select-button selected"
                        : "select-button"
                    }
                    onClick={() => {
                      handleSetMethod("email");
                    }}
                  >
                    <div
                      className={method === "email" ? "logo white-img" : "logo"}
                    >
                      <img
                        src={method === "email" ? whiteEmailImg : blackEmailImg}
                        alt="email logo"
                      />
                    </div>
                    <p className="text">{Localization.recovery.emailAddress}</p>
                  </div>
                  <div
                    className={
                      method === "email"
                        ? "select-button"
                        : "select-button selected"
                    }
                    onClick={() => {
                      handleSetMethod("phone");
                    }}
                  >
                    <div
                      className={method === "email" ? "logo" : "logo white-img"}
                    >
                      <img
                        src={method === "email" ? blackPhoneImg : whitePhoneImg}
                        alt="phone"
                      />
                    </div>
                    <p className="text">{Localization.recovery.phoneNumber}</p>
                  </div>
                </div>
                <p className="p-1">{Localization.recovery.recoveryMethod}</p>
                {method === "email" ? (
                  <div className="user-name">
                    <div
                      style={{ flexDirection: "column" }}
                      className="form-container"
                    >
                      <Input
                        type="text"
                        autoFocus={true}
                        value={email}
                        onChange={(e) => {
                          setEmail(e);
                        }}
                        className={`recovery-nput ${
                          emailMessage && "validation"
                        }`}
                        placeholder={"Recovery email address"}
                      />
                      {emailMessage && <Validation error={emailMessage} />}
                    </div>
                    <p className="recoveryMessage">
                      {Localization.recovery.receiveMessage}
                    </p>
                  </div>
                ) : (
                  <>
                    <>
                      <div className="wrapper mb-2">
                        <ReactPhoneInput
                          inputExtraProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                          }}
                          inputClass={`phone-input ${
                            numberMessage && "validation"
                          }`}
                          buttonClass={`country-dropdown ${
                            numberMessage && "validation"
                          }`}
                          value={number}
                          onChange={(e) => {
                            setNumber(e);
                          }}
                          country={"us"}
                        />

                        {numberMessage && <Validation error={numberMessage} />}
                      </div>
                    </>
                  </>
                )}
                <p className="note mb-8">
                  {method === "email"
                    ? Localization.emailMsg
                    : Localization.smsMsg}
                </p>
                <div className="send-code">
                  {userObj.min > 0 ||
                  (userObj.min === 0 && userObj.seconds > 0) ? (
                    <>
                      <button className="timer">
                        Wait for{" "}
                        {userObj.min < 10 ? `0${userObj.min}` : userObj.min}:
                        {userObj.seconds < 10
                          ? `0${userObj.seconds}`
                          : userObj.seconds}{" "}
                        min to Send the Code
                      </button>
                    </>
                  ) : (
                    <button className="next-btn" onClick={nextPage}>
                      Send Code
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Verification
              recovery={recovery}
              setShowCode={setShowCode}
              setPre={setPre}
              email={email}
              number={number}
            />
          )}
        </div>
      </div>
      <div className="bxo-container">
        <div className="box" onClick={() => {}}>
          <div className="arrow" />

          <div className="subscribe-icon"></div>

          <div>Subscriptions</div>
        </div>
      </div>

      <div className="bxo-container">
        <div className="box" onClick={() => {}}>
          <div className="arrow" />

          <div className="payment-icon"></div>

          <div>Payment</div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyKloudAccountRecovery);
