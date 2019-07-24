import ajax from "./ajax";
import { userStore } from "../app";

const parseResponse = (response: any) =>
  Object.keys(response).length === 0 || response.error ? undefined : response;

export const loginRequest = async (data: {email: string, password: string}) => {
  try {
    const response: any = await ajax("POST", "/api/users/login", data, 200);
    userStore.user = parseResponse(response);
  } catch (e) {
    return "Podane dane są nieprawidłowe";
  }
};

export const registerRequest = async (data: {email: string, password: string, name: string}) => {
  try {
    const response: any = await ajax("POST", "/api/users", data, 201);
    userStore.user = parseResponse(response);
  } catch (e) {
    if (e.error.code === 11000) {
      return "Email jest już zajęty";
    }
  }
};

export const getProfileRequest = async () => {
  try {
    const response = await fetch("/api/users/me");
    const parsed = await response.json();
    if(parseResponse(parsed)){
      userStore.user = { ...parsed.user, ...parsed.ownItems };
    }
  } catch (e) {}
};

export const logoutRequest = async () => {
  try {
    await ajax("POST", "/api/users/logout", undefined, 200);
    userStore.user = undefined;
  } catch (e) {}
};
