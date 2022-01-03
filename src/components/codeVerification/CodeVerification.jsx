import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import VerificationInput from "../common/verificationInput";
import { useHistory } from "react-router-dom";
import "./codeVerification.scss";
import Localization from "./localization";
import {
  removeStorage,
  setStorage,
  getResend,
  setResend,
} from "../../config/storage";
import { sendOtp } from "../../services/register";
import { Button, Modal } from "react-bootstrap";
import Validation from "../common/validation";
import { changeRecovery } from "../../services/accountSetting";

let interval;

const CodeVerification = (props) => {
  const recovery = props.recovery || "01012345678";
  const recoveryObj = { value: recovery[0], method: recovery[1] };
  const [seconds, setSeconds] = useState(59);
  const [min, setMin] = useState(0);
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialMinute = 15;
  const initialSeconds = 59;

  const formValidation = {
    resend: {
      name: "resend",
      wait: Localization.validation.resend.wait,
    },
  };

  const [error, setError] = useState(() => formValidation.resend.wait);
  const [verifyError, setVerifyError] = useState("");
  const userObj = props.userReducer;
  const otp = props.otpReducer;
  //
  const [isTimer, setIsTimer] = useState(false);
  let reduxMin = userObj.min;
  let reduxSeconds = userObj.seconds;

  const resendCode = () => {
    sendOtp({
      value: recoveryObj.value,
      otp: otp.otp,
    });

    if (getResend() === "first") {
      setResend("second");
      setMin(1);
      setSeconds(0);
    } else if (getResend() === "second") {
      setResend("third");
      setMin(initialMinute);
      setSeconds(0);
      setError(() => formValidation.resend.wait);
    } else if (getResend() === "third") {
      setMin(initialMinute);
      setSeconds(0);
      setError(() => formValidation.resend.wait);
    }
  };

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang, userObj.recovery]);

  useEffect(() => {
    if (reduxMin !== 0) {
      setMin(reduxMin);
    }

    if (reduxSeconds > 0) {
      setSeconds(reduxSeconds);
    }
    if (getResend() === "first" && reduxMin === 0 && reduxSeconds === 0) {
      setMin(1);
      setSeconds(0);
    }
    if (getResend() === "second" && reduxMin === 0 && reduxSeconds === 0) {
      setMin(1);
      setSeconds(0);
    }

    if (getResend() === "third" && reduxMin === 0 && reduxSeconds === 0) {
      setMin(initialMinute);
      setSeconds(0);
      setError(() => formValidation.resend.wait);
    }

    interval = setInterval(() => {
      setIsTimer(true);
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (seconds < 0 && min > 0) {
      setMin((min) => min - 1);
      setSeconds(initialSeconds);
    }

    if (seconds === 0 && min === 0 && isTimer) {
      clearInterval(interval);
    }
  }, [seconds, min]);

  useEffect(() => {
    userObj.min = min;
  }, [min]);

  useEffect(() => {
    if (seconds > 0) {
      userObj.seconds = seconds;
    }
  }, [seconds]);

  const history = useHistory();

  const pre = () => {
    clearInterval(interval);

    if (props.setStage) {
      props.setStage("recovery");
    } else {
      props.setShowCode(false);
      setStorage("recovery");
      props.setPre(!props.pre);
      history.push({
        pathname: "/accountSettings",
      });
    }
  };

  const verifyCode = () => {
    removeStorage();
    if (props.push) {
      history.push({
        pathname: props.push,
      });
    }
    if (props.resetPass) {
      props.setStage("reset");
    }

    // TODO
    if (otp.otp === code) {
      const information = {
        username: "yash@mykmail.io",
        recovery: props.email ? props.email : props.number,
      };
      changeRecovery(information);

      handleShow()
        .then((res) => {})
        .catch((err) => {
          console.log("err");
        });
    } else {
      setVerifyError("Incorrect code, try again.");
    }
  };

  return (
    <>
      <div className="recovery-form-container verification-containers">
        <div className="form-wrapper">
          <h1 className="form-title">{`${Localization.title}`}</h1>
          <p className="subtitle">{recoveryObj.value}</p>

          <div className="input-wrapper">
            <VerificationInput
              setCode={setCode}
              setVerifyError={setVerifyError}
            />
            {verifyError && <Validation error={verifyError} />}
            {min > 0 ? <p className=" error">{error}</p> : ""}
            <div className="flex mt-4">
              <p className="info mr-1">{Localization.notRecieve}</p>

              {min > 0 || (min === 0 && seconds > 0) ? (
                <>
                  <p className="timer">
                    Wait for {min < 10 ? `0${min}` : min}:
                    {seconds < 10 ? `0${seconds}` : seconds} sec
                  </p>
                </>
              ) : (
                <>
                  <p className="action" onClick={resendCode}>
                    {Localization.resend}
                  </p>
                </>
              )}
            </div>
            <div className="flex mt-4">
              {recoveryObj.value.method === "email" ? (
                <p className="info mr-1">{Localization.notYourEmail}</p>
              ) : (
                <p className="info mr-1">{Localization.notYourNumber}</p>
              )}
              <p className="action" onClick={pre}>
                {Localization.change}
              </p>
            </div>
            <div className="flex mt-4 justify-between ...">
              <button className="pre" onClick={pre}>
                {Localization.previous}
              </button>
              <button className="verify" onClick={verifyCode}>
                {Localization.verify}
              </button>
              {show && (
                <Modal
                  className="modal-flex-container"
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Body className="modal-flex-body">
                    <div className="modal-logo"></div>
                    <h1 className="modal-success">
                      {Localization.modal.success}
                    </h1>
                    <p className="modal-message">
                      {Localization.modal.updatedMessage}
                    </p>
                    <Button
                      className="modal-button"
                      variant="primary"
                      onClick={handleClose}
                    >
                      Done
                    </Button>
                  </Modal.Body>
                </Modal>
              )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification);
