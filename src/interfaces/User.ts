import IItem from './Item';

export default interface IUser {
  name: string;
  avatar?: string;
  _id: string;
  ownItems?: Array<IItem>;
  followers?: Array<IUser>;
}
