import IItem from './Item';

export default interface IUser {
  name: string;
  avatar?: string;
  _id: string;
  ownItems?: Array<IItem>;
  followers?: Array<IUser>;
  followedBy: Array<IUser>;
}

/*
ownitems followers and followedby will be fetched if would be need by id, example /items?createdBy=id
*/