import http from "./http";
const apiEndPointGetInformation = `/userAccount`;
const apiEndPointEditAccount = `/editUserAccount`;

export async function getUserInformation(username) {
  const param = `?username=${username}`;
  const { data } = await http.get(`${apiEndPointGetInformation}${param}`);
  return data;
}

export async function changeFirstOrLastName(information) {
  const { username, firstName, lastName } = information;
  const info = {
    username,
    firstName,
    lastName,
  };
  const { data } = await http.put(apiEndPointEditAccount, info);
  return data;
}

export async function changePassword(information) {
  const { username, password } = information;
  const info = {
    username,
    password,
  };
  const { data } = await http.put(apiEndPointEditAccount, info);
  return data;
}

export async function changeRecovery(information) {
  const { username, recovery } = information;
  const info = {
    username,
    recovery,
  };
  const { data } = await http.put(apiEndPointEditAccount, info);
  return data;
}

const service = { getUserInformation, changeFirstOrLastName, changeRecovery };

export default service;
