import IItem from "../interfaces/IItem";
import ajax from "./ajax";
import { parseResponse } from "./functions";
import { userStore } from "../app";
import fetchData from "./fetchData";
import { Iimages, IUpdate } from "../components/Item/CreateItem/interfaces";
import { addImagesRequest, removeImageRequest } from "./images";

export const addItemRequest = async (item: IItem, images: Array<string>) => {
  try {
    const imagesResponse: any = await addImagesRequest(images);

    const imagesURLs = imagesResponse.map((e: string) => `/api/images/${e}`);
    const response = await ajax(
      "POST",
      "/api/items",
      { ...item, images: imagesURLs },
      201
    );
    userStore.ownItems = [...userStore.getOwnItems, response];
  } catch (e) {
    console.log(e);
  }
};

export const getItemRequest = async (id: string) =>
  await fetchData(id, "/api/items/");

export const getItemsRequest = async (query?: any) => {
  if (query) {
    var queryString = Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join("&");
  }
  const items = await fetchData(
    queryString ? "?" + queryString : "",
    "/api/items"
  );
  return items;
};

export const editItemRequest = async (
  _id: string,
  update: IUpdate,
  initialImages: Array<string>,
  imagesToAdd: Array<string>,
  imagesToRemove: Array<string>
) => {
  try {
    await Promise.all(
      imagesToRemove.map(async image => {
        return await removeImageRequest(image.replace("/api/images/", ""));
      })
    );
    const imagesResponse: any = await addImagesRequest(imagesToAdd);
    const newImagesURLs = imagesResponse.map((e: string) => `/api/images/${e}`);
    update.images = [...initialImages, ...newImagesURLs].filter(
      e => !imagesToRemove.includes(e)
    );
    const response = await ajax("PATCH", `/api/items/${_id}`, { update }, 200);
    userStore.updateItem(_id, update)
  } catch (e) {
  }
};
