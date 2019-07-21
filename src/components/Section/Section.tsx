import React from "react";
import IUser from "../../interfaces/User";
import IItem from "../../interfaces/Item";
import Item from "./Item/Item";
import style, { Title, ItemsContainer, Button } from "./styleSection";
import UserLabel from "./UserLabel/UserLabel";

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

      {users &&
        users.map(user => (
          <div>
            <UserLabel size="big" user={user} />
            {user.ownItems && (
              <ItemsContainer>
                {user.ownItems.map(item => (
                <Item userLabelVisible={false} item={item} key={item._id} />
                ))}
                <Button>Zobacz wszystkie</Button>
              </ItemsContainer>
            )}
          </div>
        ))}

      {items && (
        <ItemsContainer>
          {items.map(item => (
            <Item userLabelVisible={true} item={item} key={item._id} />
          ))}
        </ItemsContainer>
      )}
    </section>
  );
};

export default style(Section);
