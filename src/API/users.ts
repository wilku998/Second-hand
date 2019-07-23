import ajax from "./ajax";
import { userStore } from "../app";

export const loginRequest = async (data: any) => {
  try {
    const response: any = await ajax("POST", "/api/users/login", data, 200);
    userStore.user = response;
  } catch (e) {}
};

export const registerRequest = async (data: any) => {
  try {
    const response: any = await ajax("POST", "/api/users", data, 201);
    userStore.user = response;
  } catch (e) {
    if (e.error.code === 11000) {
      return "Email jest już zajęty";
    }
  }
};

export const getProfileRequest = async () => {
  try {
    const response = await fetch("/api/users/me");
    const parsed = await response.json()
    userStore.user = {...parsed.user, ...parsed.ownItems};
  } catch (e) {}
};

export const logoutRequest = async () => {
  try {
    await ajax("POST", "/api/users/logout", undefined, 200);
    userStore.user = undefined;
  } catch (e) {}
};
