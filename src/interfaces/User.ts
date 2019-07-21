export default interface IUser {
  name: string;
  age?: number;
  avatar: string;
  description?: string;
  ownItems?: Array<{
    brand: string;
    category: string;
    price: number;
    size: string;
    image: string;
    _id: string;
  }>;
  followers?: Array<IUserSmall>;
  _id: string;
}

export interface IUserSmall {
  name: string,
  _id: string,
  avatar: string
}