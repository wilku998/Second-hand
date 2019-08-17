import IItem from "../interfaces/IItem";
import ajax from "./ajax";
import { userStore } from "../app";
import fetchData from "./fetchData";
import { IUpdate } from "../components/Item/CreateItem/interfaces";
import { addImagesRequest, removeImageRequest } from "./images";
import { ISearchItemsQuery } from "../interfaces/ISearchItemsQuery";

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

export const getItemsRequest = async (query?: ISearchItemsQuery["query"]) => {
  if (query) {
    var queryString = query.map(e => `${e.name}=${e.selectedFilters.join("|")}`).join("&");
  }

  const items = await fetchData(
    queryString ? "?" + queryString : "",
    "/api/items"
  );
  if(!items){
    return []
  }
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
    await ajax("PATCH", `/api/items/${_id}`, { update }, 200);
    userStore.updateItem(_id, update);
  } catch (e) {}
};
