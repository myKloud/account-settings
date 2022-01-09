import Localization from "./localization";

const formValidation = {
  firstName: {
    name: "firstName",
    required: Localization.validation.firstName.required,
  },
  lastName: {
    name: "lastName",
    required: Localization.validation.lastName.required,
  },
  name: {
    requiredBoth: Localization.validation.name.requiredBoth,
  },
  currentPassword: {
    name: "currentPassword",
    required: Localization.validation.currentPassword.required,
    length: Localization.validation.password.length,
    pattern: Localization.validation.password.patteren,
  },
  password: {
    name: "password",
    required: Localization.validation.password.required,
    length: Localization.validation.password.length,
    pattern: Localization.validation.password.patteren,
  },
  confirmPassword: {
    name: "confirmPassword",
    required: Localization.validation.confirmPassword.required,
    match: Localization.validation.confirmPassword.match,
  },
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

export default formValidation;
