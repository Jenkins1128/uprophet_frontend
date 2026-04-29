import axios from 'axios';
import { url } from '@/domain';
import type { CurrentUser, SigninCredentials, SignupCredentials, ChangePasswordCredentials, NewPasswordPayload, ForgotPasswordPayload } from '@/types';

export const fetchCurrentUser = async (): Promise<CurrentUser> => {
  const { data } = await axios.get(`${url}/currentUser`, {
    withCredentials: true,
    headers: { Accept: '*/*' },
  });
  return data;
};

export const signinRequest = async ({ username, password }: SigninCredentials): Promise<void> => {
  const { data } = await axios.post(`${url}/signin`, { username, password }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const signupRequest = async ({ name, username, password, email }: SignupCredentials): Promise<void> => {
  const { data } = await axios.post(`${url}/signup`, { name, username, password, email }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const changePasswordSignInRequest = async ({ username, password }: ChangePasswordCredentials): Promise<void> => {
  const { data } = await axios.post(`${url}/changePasswordSignIn`, { username, password }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const changePasswordRequest = async ({ username, newPassword }: NewPasswordPayload): Promise<void> => {
  const { data } = await axios.post(`${url}/changePassword`, { username, password: newPassword }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const forgotPasswordRequest = async ({ username, email }: ForgotPasswordPayload): Promise<void> => {
  const { data } = await axios.post(`${url}/forgotPassword`, { username, email }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};
