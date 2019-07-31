import IItem from '../interfaces/item'
import ajax from './ajax';
import { parseResponse } from './functions';
import { userStore } from "../app";
import fetchData from './fetchData';

export const addItemRequest = async (item: IItem, images: Array<string>) => {
    try {
        const imagesResponse = await ajax("POST", "/api/images", JSON.stringify({images}), 200);
        const imagesURLs = parseResponse(imagesResponse).map((e: string) => `/api/images/${e}`);
        const response = await ajax("POST", '/api/items', JSON.stringify({...item, images: imagesURLs}), 201);
        userStore.ownItems = [...userStore.getOwnItems, response]
    }catch(e){
        console.log(e)
    }
}

export const getItemRequest = async (id: string) => await fetchData(id, '/api/items/')