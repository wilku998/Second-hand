import IItem from '../interfaces/item'
import ajax from './ajax';
import { parseResponse } from './functions';
import { userStore } from "../app";

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

export const getItemRequest = async (id: string) => {
    try {
        const item = await fetch(`/api/items/${id}`)
        return parseResponse(await item.json());
    }catch(e){

    }
}