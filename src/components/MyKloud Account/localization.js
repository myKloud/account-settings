import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
    en: {
        title: "myKloud Account",
        profile: "Profile",
        profileDetails: {
            firstName: "FirstName",
            lastName: "LirstName",
        },

        validation: {
            email: {
                required: "Please enter valid email address",
                redundant:
                    "Please enter secondary email address, that is not myKloud email",
            },
            number: {
                required:
                    "Please enter valid phone number or change the country code",
            },
        },
    },
});

export default Localization;
