import formValidation from "./formValidation";

const validate = (
  input,
  value,
  {
    setNameMessage,
    setFirstNameMessage,
    lastName,
    setLastNameMessage,
    firstName,
    setPassMessage,
    confirmPassword,
    setPassConfirmMessage,
    password,
    setCurrentMassMessage,
  }
) => {
  let isValid = true;
  const validPass =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,128}$/;

  if (input.name === "firstName") {
    setNameMessage("");
    setFirstNameMessage("");
    if (!value.length) {
      setFirstNameMessage(input.required);
      setNameMessage(input.required);
      if (!lastName.length) {
        setLastNameMessage(input.required);
        setNameMessage(formValidation.name.requiredBoth);
      }
      isValid = false;
    }
  }
  if (input.name === "lastName") {
    setNameMessage("");
    setLastNameMessage("");
    if (!value.length) {
      setLastNameMessage(input.required);
      setNameMessage(input.required);
      if (!firstName.length) {
        setFirstNameMessage(input.required);
        setNameMessage(formValidation.name.requiredBoth);
      }
      isValid = false;
    }
  }
  if (input.name === "currentPassword") {
    // put api to check if the password is correct or not
    // if currentPassword !== password from database
    // isValid = false
    // setCurrentMassMessage("your password is not correct");
    // setCurrentMassMessage("need an api to git the current password");
  }
  if (input.name === "password") {
    setPassMessage("");
    if (!value.length) {
      setPassMessage(input.required);
      isValid = false;
    } else if (!validPass.test(value)) {
      setPassMessage(input.length);
      isValid = false;
    } else if (confirmPassword !== value) {
      setPassConfirmMessage(formValidation.confirmPassword.match);
      isValid = false;
    } else {
      setPassConfirmMessage("");
    }
  }
  if (input.name === "confirmPassword") {
    setPassConfirmMessage("");
    if (!value.length) {
      setPassConfirmMessage(input.required);
      isValid = false;
    } else if (password !== value) {
      setPassConfirmMessage(input.match);
      isValid = false;
    }
  }
  return isValid;
};

export default validate;
