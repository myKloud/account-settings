import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Localization from "../localization";
import formValidation from "../formValidation";

import Input from "../../common/input";
import Validation from "../../common/validation";
import { changeFirstOrLastName } from "../../../services/accountSetting";
import validate from "../validate";

const AccountSettingProfile = (props) => {
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameMessage, setFirstNameMessage] = useState("");
  const [lastNameMessage, setLastNameMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const validateHandler = () => {
    const isValidFirstName = validate(formValidation.firstName, firstName, {
      setNameMessage,
      setFirstNameMessage,
      lastName,
      setLastNameMessage,
      firstName,
    });
    const isValidLastName = validate(formValidation.lastName, lastName, {
      setNameMessage,
      setFirstNameMessage,
      lastName,
      setLastNameMessage,
      firstName,
    });
    return isValidFirstName && isValidLastName;
  };

  const saveInfo = () => {
    if (validateHandler()) {
      const information = {
        username: "yash@mykmail.io",
        firstName: firstName,
        lastName: lastName,
      };
      changeFirstOrLastName(information);
      setSaveMessage("Changed Success");
    }
  };

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <div className="bxo-container">
      <section
        className={`box ${showProfileDetails ? "selected-category" : ""}`}
        onClick={() => {
          setShowProfileDetails(!showProfileDetails);
        }}
      >
        <div
          className={`${!showProfileDetails ? "arrow" : "rotate-arrow"}`}
        ></div>
        <div className="profile-icon"></div>
        {Localization.profile}
      </section>
      <section className={showProfileDetails ? "show" : "hide"}>
        <div className="form-container">
          <div className="firstName-lastName-container">
            <p className="profile-message">
              {Localization.profileDetails.personalInfo}
            </p>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e);
                validate(formValidation.firstName, e, {
                  setNameMessage,
                  setFirstNameMessage,
                  lastName,
                  setLastNameMessage,
                  firstName,
                });
                setSaveMessage("");
              }}
              autoFocus={true}
              placeholder="First Name"
              containerClassName="first-name"
              className={`${firstNameMessage && "validation"}`}
            />
            <Input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e);
                validate(formValidation.lastName, e, {
                  setNameMessage,
                  setFirstNameMessage,
                  lastName,
                  setLastNameMessage,
                  firstName,
                });
                setSaveMessage("");
              }}
              placeholder="Last Name"
              className={`${lastNameMessage && "validation"}`}
            />
            <div>
              {nameMessage && <Validation error={nameMessage} />}
              <p className="successProfileInfo">
                {!nameMessage ? saveMessage : ""}
              </p>
            </div>
            <div className="save-button-container">
              <button className="next" onClick={saveInfo}>
                {Localization.save}
              </button>
            </div>
          </div>
        </div>
      </section>
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
)(AccountSettingProfile);
