import React from "react";
import IUser from "../../interfaces/User";
import IItem from "../../interfaces/Item";
import Item from "../Item/Item";
import User from "../User/User";
import style, { Title, ItemsContainer } from "./styleSection";

export interface IProps {
  className?: string;
  title: string;
  items?: Array<IItem>;
  users?: Array<IUser>;
}

const Section = ({ className, title, items, users }: IProps) => {
  return (
    <section className={className}>
      <Title>{title}</Title>
      {users && users.map(user => <User key={user._id} user={user}/>)}
      {items && (
        <ItemsContainer>
          {items.map(item => (
            <Item item={item} key={item._id} />
          ))}
        </ItemsContainer>
      )}
    </section>
  );
};

export default style(Section);
