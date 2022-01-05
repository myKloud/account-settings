import http from "./http";

const apiEndPoint_check = `/check`;
const apiEndPoint_signup = `/signup`;
const apiEndPointSendOtp = `/otp`;
const apiEndPointVerifyOtp = `/verifyOtp`;

export async function checkUser(username) {
  const param = `?username=${username}`;
  const { data } = await http.get(`${apiEndPoint_check}${param}`);
  return data;
}

export async function sendOtp(recovery) {
  const info = {
    recovery: recovery.value,
    recoveryType: recovery.type,
  };
  const { data } = await http.post(apiEndPointSendOtp, info);
  return data;
}

export async function verifyOtp(recovery) {
  const param = `?recovery=${recovery.value}&code=${recovery.otp}`;
  const { data } = await http.get(`${apiEndPointVerifyOtp}${param}`);
  return data.message;
}

export async function signUp(informations) {
  const { username, firstName, lastName, password, recovery } = informations;
  const info = {
    username,
    firstName,
    lastName,
    password,
    recovery,
  };

  const { data } = await http.post(apiEndPoint_signup, info);

  return data;
}

const service = { checkUser, sendOtp, signUp };

export default service;
