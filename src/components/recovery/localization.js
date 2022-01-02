import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Welcome",
    subTitle: "Your myKloud account has been created succesfully.",

    selectRecovery: "For now , let’s select your recovery method",
    emailAddress: "Email address",
    phoneNumber: "Phone number",

    emailPlaceholder: "Recovery email address",

    emailMsg: "You’ll recieve an email with a confirmation code",
    smsMsg: "You’ll recieve an sms with a cofnirmation code",
    sendCode: "Send me code",

    validation: {
      email: {
        required: "Please enter valid email address",
        redundant:
          "Please enter secondary email address, that is not myKloud email",
      },
      number: {
        required: "Please enter valid phone number or change the country code",
      },
    },
  },
});

export default Localization;
