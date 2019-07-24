import IUser from './User';

export default interface Item {
    brand: string,
    category: string,
    price: number,
    size: string,
    image: string,
    _id: string,
    owner?: IUser
}