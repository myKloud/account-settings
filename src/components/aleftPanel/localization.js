import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    backToKmail: "Back to Kmail", //

    list: {
      topList: {
        kmailSettings: "Kmail settings",
        accountSettings: "Account Settings",
        help: "Help",
        legal: "Legal",
      },
      storage: {
        storage: "Storage",
        percent: "10%",
        fullSpace: "3 GB of 10 GB used",
        upgrade: "upgrade",
      },
    },
  },
});

export default Localization;
