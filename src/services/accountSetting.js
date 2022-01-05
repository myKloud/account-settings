import http from "./http";
const apiEndPointUser = `/user`;
const apiEndPointPassword = `/password`;

export async function getUserInformation(username) {
  const param = `?username=${username}`;
  const { data } = await http.get(`${apiEndPointUser}${param}`);
  return data;
}

export async function changeFirstOrLastName(information) {
  const { username, firstName, lastName } = information;
  const info = {
    username,
    firstName,
    lastName,
  };
  const { data } = await http.put(apiEndPointUser, info);
  return data;
}

export async function changePassword(information) {
  const { username, oldPassword, newPassword } = information;
  const info = {
    username,
    oldPassword,
    newPassword,
  };
  const { data } = await http.put(apiEndPointPassword, info);
  return data;
}

export async function changeRecovery(information) {
  const { username, recovery } = information;
  const info = {
    username,
    recovery,
  };
  const { data } = await http.put(apiEndPointPassword, info);
  return data;
}

const service = { getUserInformation, changeFirstOrLastName, changeRecovery };

export default service;
