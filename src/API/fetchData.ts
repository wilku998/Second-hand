import { parseResponse } from './functions';

export default async (params: string, url: string) => {
    try {
        const item = await fetch(`${url}${params}`);
        return parseResponse(await item.json());
    }catch(e){

    }
}