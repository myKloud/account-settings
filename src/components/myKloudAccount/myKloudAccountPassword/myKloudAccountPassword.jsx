import React, { useState } from "react";
import Localization from "../localization";
import { connect } from "react-redux";
import Input from "../../common/input";
import Validation from "../../common/validation";
import formValidation from "../formValidation";
import { changePassword } from "../../../services/accountSetting";
import validate from "../validate";
import "./myKloudAccountPassword.scss";

const MyKloudAccountPassword = () => {
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [passConfirmMessage, setPassConfirmMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentMassMessage, setCurrentMassMessage] = useState("");
  const [succeed, setSucceed] = useState("");

  const validateHandler = () => {
    const isValidCurrentPassword = validate(
      formValidation.currentPassword,
      currentPassword,
      {
        setPassMessage,
        confirmPassword,
        setPassConfirmMessage,
        password,
        setCurrentMassMessage,
      }
    );
    const isValidPassword = validate(formValidation.password, password, {
      setPassMessage,
      confirmPassword,
      setPassConfirmMessage,
      password,
      setCurrentMassMessage,
    });
    const isValidConfirmPassword = validate(
      formValidation.confirmPassword,
      confirmPassword,
      {
        setPassMessage,
        confirmPassword,
        setPassConfirmMessage,
        password,
        setCurrentMassMessage,
      }
    );
    return isValidPassword && isValidConfirmPassword && isValidCurrentPassword;
  };

  const savePassword = () => {
    const isValid = validateHandler();

    if (isValid) {
      const information = {
        username: "yash@mykmail.io",
        password: password,
      };
      // API for Change Password
      changePassword(information);
      setSucceed("Change Success");
    }
  };

  return (
    <div className="bxo-container">
      <div
        className={`${showPasswordDetails ? "selected-category" : ""} box`}
        onClick={() => {
          setShowPasswordDetails(!showPasswordDetails);
        }}
      >
        <div
          className={`${!showPasswordDetails ? "arrow" : "rotate-arrow"}`}
        ></div>

        <div className="pass-icon"></div>
        <div>{Localization.passowrd_placeholder}</div>
      </div>
      <div className={showPasswordDetails ? "show" : "hide"}>
        <div className="form-container">
          <div className="password-container">
            <p className="password-message">
              {Localization.validation.password.mesage}
            </p>
            <div className="relative password-margin">
              <Input
                type={"text"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e);
                }}
                className={`extra-padding ${
                  currentMassMessage && "validation"
                } ${!showCurrentPassword && "password-mask"}`}
                placeholder="current Password"
              />
              <button
                className="input_visibilty"
                onClick={() => {
                  setShowCurrentPassword(!showCurrentPassword);
                }}
              >
                {!showCurrentPassword ? (
                  <u style={{ color: "#1565d8" }}>{Localization.show}</u>
                ) : (
                  <u style={{ color: "#1565d8" }}>{Localization.hide}</u>
                )}
              </button>
              {currentMassMessage && <Validation error={currentMassMessage} />}
            </div>
            <div className="relative password-margin">
              <Input
                type={"text"}
                value={password}
                onChange={(e) => {
                  setPassword(e);
                  validate(formValidation.password, e, {
                    setPassMessage,
                    confirmPassword,
                    setPassConfirmMessage,
                    password,
                    setCurrentMassMessage,
                  });
                }}
                className={`extra-padding ${passMessage && "validation"} ${
                  !showPassword && "password-mask"
                }`}
                placeholder="new Password"
              />
              <button
                className="input_visibilty"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <u style={{ color: "#1565d8" }}>{Localization.show}</u>
                ) : (
                  <u style={{ color: "#1565d8" }}>{Localization.hide}</u>
                )}
              </button>
              {passMessage && <Validation error={passMessage} />}
            </div>
            <div className="relative">
              <Input
                type={"text"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e);
                  validate(formValidation.confirmPassword, e, {
                    setPassMessage,
                    confirmPassword,
                    setPassConfirmMessage,
                    password,
                    setCurrentMassMessage,
                  });
                }}
                className={`extra-padding ${
                  passConfirmMessage && "validation"
                } ${!showConfirmPassword && "password-mask"}`}
                placeholder="confirm new password"
              />
              <button
                className="input_visibilty"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {!showConfirmPassword ? (
                  <u style={{ color: "#1565d8" }}>{Localization.show}</u>
                ) : (
                  <u style={{ color: "#1565d8" }}>{Localization.hide}</u>
                )}
              </button>
              {passConfirmMessage && <Validation error={passConfirmMessage} />}
            </div>
            <div className="save-button-container">
              <button className="next" onClick={savePassword}>
                {Localization.save}
              </button>
            </div>
          </div>
        </div>
        {succeed}
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyKloudAccountPassword);
