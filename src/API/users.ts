import ajax from "./ajax";
import { userStore } from "../app";
import { parseResponse, setUserStore } from "./functions";
import fetchData from "./fetchData";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response: any = await ajax(
      "POST",
      "/api/users/login",
      data,
      200
    );
    setUserStore(response)
  } catch (e) {
    console.log(e)
    return "Podane dane są nieprawidłowe";
  }
};

export const registerRequest = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response: any = await ajax(
      "POST",
      "/api/users",
      data,
      201
    );
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
    const data = await response.json();
    setUserStore(data)
  } catch (e) {}
};

export const logoutRequest = async () => {
  try {
    await ajax("POST", "/api/users/logout", undefined, 200);
    userStore.user = undefined;
    userStore.ownItems = [];
  } catch (e) {}
};

export const getUserRequest = async (id: string) => await fetchData(id, '/api/users/');

export const getUsersRequest = async () => await fetchData('', '/api/users');

