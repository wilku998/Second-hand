import { parseResponse } from './functions';

export default async (id: string, url: string) => {
    try {
        const item = await fetch(`${url}${id}`)
        return parseResponse(await item.json());
    }catch(e){

    }
}