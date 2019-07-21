import React from "react";
import ReactSVG from "react-svg";
import { Avatar, styleUserLabel, FollowButton, Info } from "./styleUserLabel";
import IUser, { IUserSmall } from "../../../interfaces/User";

export interface IUserLabelProps {
  user: IUserSmall | IUser;
  className?: string;
  size: string;
}
const UserLabel = ({ user, className, size }: IUserLabelProps) => {
  const { name, avatar, follwers, ownItems } = user;
  return (
    <div className={className}>
      <Avatar size={size} src={avatar} />
      {size === "big" ? (
        <Info>
          <h3 size={size}>{name}</h3>
          <span>Obserwujących: {follwers ? follwers.length : 0}</span>
          <span>
            Przedmiotów na sprzedzaż: {ownItems ? ownItems.length : 0}
          </span>
        </Info>
      ) : (
        <Info>
          <h3 size={size}>{name}</h3>
        </Info>
      )}
      <FollowButton>
        <ReactSVG src="./svg/eye.svg" />
      </FollowButton>
    </div>
  );
};

export default styleUserLabel(UserLabel);
