import axios from "axios";
import { serverUrl } from "../utils/BaseUrl";

export const LoginApi = (values) => {
  return axios.post(`${serverUrl}/member/login-member`, values);
};

export const CreateMemberApi = (values) => {
  return axios.post(`${serverUrl}/member/register-member`, values, { headers: { token: localStorage?.token } });
};

export const getMemberListApi = () => {
  return axios.get(`${serverUrl}/member/member-list`, { headers: { token: localStorage?.token } });
};

export const GetTaskListApi = () => {
  return axios.get(`${serverUrl}/member/task-list`, { headers: { token: localStorage?.token } });
};

export const CreateTaskApi = (values) => {
  return axios.post(`${serverUrl}/task/create-task`, values, { headers: { token: localStorage?.token } });
};
