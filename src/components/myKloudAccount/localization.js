import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "myKloud Account",
    profile: "Profile",

    show: "show",
    hide: "hide",
    next: "Next",

    username_placeholder: "Username",
    username_validation_general:
      "Only letters (a-z), numbers (0-9) and periods(.) are allowed",

    passowrd_placeholder: "Password",
    confirm_passowrd_placeholder: "Confirm Password",
    save: "Save",
    msg: "Safe & secure via myKloud.",

    profileDetails: {
      firstName: "FirstName",
      lastName: "LirstName",
      personalInfo: "Change your personal information",
    },

    recovery: {
      accountRecovery: "Account recovery",
      emailAddress: "Email address",
      phoneNumber: "Phone Number",
      recoveryMethod: "Change recovery method",
      receiveMessage: " You'll receive an email with confirmation code",
    },
    validation: {
      firstName: {
        required: "First name is required",
      },
      lastName: {
        required: "Last name is required",
      },
      name: {
        requiredBoth: "First and Last name are required",
      },
      email: {
        required: "Please enter valid email address",
        redundant:
          "Please enter secondary email address, that is not myKloud email",
      },
      number: {
        required: "Please enter valid phone number or change the country code",
      },
      password: {
        required: "Enter password",
        length:
          "Use 8 or more characters with a mix of letters, numbers & symbols",
        pattern:
          "Use 8 or more characters with a mix of letters, numbers & symbols",
        mesage:
          "Your password must contain at least 8 characters, and a mix of letters, number and symbols",
      },

      confirmPassword: {
        required: "Confirm your password",
        match: "Those passwords didn’t match. Try again.",
      },
    },
  },
});

export default Localization;
