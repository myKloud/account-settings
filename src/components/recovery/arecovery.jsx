import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import blackEmailImg from "../../images/email1.png";
import whiteEmailImg from "../../images/email2.png";
import blackPhoneImg from "../../images/phone1.png";
import whitePhoneImg from "../../images/phone2.png";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../common/input";
import Validation from "../common/validation";
import { setUserObj } from "../../actions/userAction";
import { setOTP } from "../../actions/otpAction";
import Localization from "./localization";
import { setStorage } from "../../config/storage";
import { generateOTP } from "../../config/util";
import { isValidPhoneNumber } from "react-phone-number-input";
import "./recovery.scss";
import { sendOtp } from "../../services/register";

const Recovery = (props) => {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");

  const history = useHistory();
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const formValidation = {
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

  const nextPage = async () => {
    const isValid = validateHandler();
    if (isValid) {
      const userObj = props.userReducer;
      userObj.method = method;
      userObj.recovery = method === "email" ? email : number;

      const otp = generateOTP();
      props.dispatch(setOTP(otp));
      setUserObj(userObj);
      setStorage("verification");

      let send = false;

      send = await sendOtp({
        value: method === "email" ? email : `+${number}`,
        otp: otp,
      });

      if (send) {
        history.push({
          pathname: "/verification",
          state: {
            value: method === "email" ? email : `+${number}`,
            method: method,
          },
        });
      }
    }
  };

  const validate = (input, value) => {
    let isValid = true;
    const domain = ["mykmail.io", "mykloudmail.io", "mkmail.io"];

    if (input.name === "email") {
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
    if (input.name === "number") {
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

  const handleSetMethod = (type) => {
    setNumberMessage("");
    setEmailMessage("");
    setMethod(type);
  };

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="form-container recovery-container">
        <div className="form-wrapper">
          <h1 className="form-title mb-8">
            {Localization.title}, {props.userReducer.firstname || "client"}!{" "}
            <span>👋</span>
          </h1>

          <div className="form-sub-content">
            <p className="form-sub-title">{Localization.selectRecovery}aaa</p>

            <div className="button-container">
              <div
                className={
                  method === "email"
                    ? "select-button mr-4 selected"
                    : "select-button mr-4"
                }
                onClick={() => {
                  handleSetMethod("email");
                }}
              >
                <div className={method === "email" ? "logo white-img" : "logo"}>
                  <img
                    src={method === "email" ? whiteEmailImg : blackEmailImg}
                    alt="email logo"
                  />
                </div>

                <p className="text">{Localization.emailAddress}--EMAIL--</p>
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
                <div className={method === "email" ? "logo" : "logo white-img"}>
                  <img
                    src={method === "email" ? blackPhoneImg : whitePhoneImg}
                    alt="phone"
                  />
                </div>

                <p className="text">{Localization.phoneNumber}</p>
              </div>
            </div>

            {method === "email" ? (
              <>
                <div className="user-name">
                  <Input
                    type="text"
                    autoFocus={true}
                    value={email}
                    onChange={(e) => {
                      setEmail(e);
                      // validate(formValidation.email, e);
                    }}
                    className={`recovery-nput ${emailMessage && "validation"}`}
                    placeholder={"Localization.emailPlaceholder"}
                  />
                  {emailMessage && <Validation error={emailMessage} />}
                </div>
              </>
            ) : (
              <>
                <div className="wrapper mb-2">
                  <ReactPhoneInput
                    inputExtraProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    inputClass={`phone-input ${numberMessage && "validation"}`}
                    buttonClass={`country-dropdown ${
                      numberMessage && "validation"
                    }`}
                    value={number}
                    onChange={(e) => {
                      setNumber(e);
                      // validate(formValidation.number, e);
                    }}
                    country={"us"}
                  />

                  {numberMessage && <Validation error={numberMessage} />}
                </div>
              </>
            )}

            <p className="note mb-8">
              {method === "email" ? Localization.emailMsg : Localization.smsMsg}
            </p>

            <button className="next-btn" onClick={nextPage}>
              {Localization.sendCode}
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);
