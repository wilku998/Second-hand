import IItem from './Item';

export default interface IUser {
  name: string;
  avatar?: string;
  _id: string;
  follows: Array<string>;
  followedBy: Array<string>;
}
