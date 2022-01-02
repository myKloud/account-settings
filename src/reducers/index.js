import { combineReducers } from "redux";
import LanguageReducer from "./languageReducer";
import UserReducer from "./userReducer";
import OTPreducer from "./otpReducer";

export default combineReducers({
  languageReducer: LanguageReducer,
  userReducer: UserReducer,
  otpReducer: OTPreducer,
});
