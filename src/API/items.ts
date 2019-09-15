import IItem from "../interfaces/IItem";
import ajax from "./ajax";
import { userStore, socket } from "../app";
import fetchData from "./fetchData";
import { IUpdate } from "../components/Item/CreateItem/interfaces";
import { addImagesRequest, removeImageRequest } from "./images";

export const addItemRequest = async (item: IItem, images: Array<string>) => {
  try {
    const imagesResponse: any = await addImagesRequest(images);

    const imagesURLs = imagesResponse.map((e: string) => `/api/images/${e}`);
    const response: IItem = await ajax(
      "POST",
      "/api/items",
      { ...item, images: imagesURLs },
      201
    );
    userStore.addItem(response);
    socket.emit("sendNewItem", userStore.getMinifiedUser, response._id);
  } catch (e) {
    console.log(e);
  }
};

export const getItemRequest = async (id: string) =>
  await fetchData(id, "/api/items/");

export const getItemsCountRequest = async (
  query: string
) => {
  const response = await fetchData(
    query,
    "/api/items/count"
  );
  return response.count;
};

export const getItemsRequest = async (query: string) => {
  const items = await fetchData(query, "/api/items");
  return items ? items : [];
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
    await ajax("PATCH", `/api/items/${_id}`, { update }, 200);
    userStore.updateItem(_id, update);
  } catch (e) {}
};

export const removeItemRequest = async (id: string) => {
  try {
    await ajax("DELETE", `/api/items/${id}`, {}, 200);
    userStore.removeItem(id);
  } catch (e) {}
};
