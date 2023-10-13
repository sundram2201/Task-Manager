import axios from "axios";
import { serverUrl } from "../utils/BaseUrl";

const verification = { headers: { token: localStorage.token } };

export const LoginApi = (values) => {
  return axios.post(`${serverUrl}/member/login-member`, values);
};

export const CreateMemberApi = (values) => {
  return axios.post(`${serverUrl}/member/register-member`, values, verification);
};

export const getMemberListApi = () => {
  return axios.get(`${serverUrl}/member/member-list`, verification);
};

export const GetTaskListApi = () => {
  return axios.get(`${serverUrl}/member/task-list`, verification);
};

export const CreateTaskApi = (values) => {
  return axios.post(`${serverUrl}/task/create-task`, values, verification);
};
