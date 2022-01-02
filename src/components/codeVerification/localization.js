import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Enter code we’ve sent to",

    notRecieve: "Didn’t recieve a code?",
    resend: "Resend",
    notYourNumber: "Not your number?",
    notYourEmail: "Not your email?",
    change: "Change",

    previous: "Previous",
    verify: "Verify",
    validation: {
      resend: {
        wait: "Please wait 15 min to resent the code.",
      },
    },
    modal: {
      success: "Success",
      updatedMessage: "Your recovery method has been updated",
    },
  },
});

export default Localization;
