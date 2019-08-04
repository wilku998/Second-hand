export default interface IUser {
  name: string;
  email: string;
  avatar?: string;
  _id: string;
  follows: Array<string>;
  followedBy: Array<string>;
}
