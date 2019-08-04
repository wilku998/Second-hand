import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { history } from "../../app";
import style, {
  Container,
  Content,
  Image,
  Description,
  Title,
  ButtonMessage,
  Seller,
  SellerProfile,
  Info,
  GridContainer,
  MainImageContainer,
  MainImage,
  ButtonSeeAll,
  SellerOtherItems,
  ItemInfo
} from "./styleItem";
import Avatar from "../Abstracts/Avatar";
import { FakeImage } from "../Abstracts/FakeImage";
import { getItemRequest, getItemsRequest } from "../../API/items";
import IItem from "../../interfaces/Item";

export interface IProps {
  className: string;
  match: any;
}

const Item = ({ className, match }: IProps) => {
  const itemID = match.params.id;
  const [item, setItem]: [IItem, any] = useState(undefined);
  const [sellerOtherItems, setSellerOtherItems] = useState([]);

  if (item) {
    var {
      category,
      brand,
      size,
      price,
      images,
      owner,
      description,
      condition,
      itemModel
    } = item;
  }

  const onSeeAllClick = () => {
    history.push(`/users/${item.owner._id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const foundedItem = await getItemRequest(itemID);
      if (foundedItem) {
        setItem(foundedItem);
        const otherItems: Array<IItem> = await getItemsRequest({
          owner: foundedItem.owner._id
        });
        if (otherItems) {
          setSellerOtherItems(otherItems.filter(e => e._id !== itemID));
        }
      }
    };
    fetchData();
  }, [itemID]);

  return (
    <Container>
      {!item ? (
        <span>przedmiot nie został znaleziony</span>
      ) : (
        <div className={className}>
          <Seller>
            <SellerProfile>
              <Avatar size="big" src={owner.avatar} />
              <span>{owner.name}</span>
            </SellerProfile>
            {sellerOtherItems.length > 0 ? (
              <SellerOtherItems>
                <Info>Inne przedmioty sprzedającego</Info>
                <GridContainer>
                  {sellerOtherItems.slice(0, 6).map(otherItem => (
                    <Image
                      as={Link}
                      to={`/items/${otherItem._id}`}
                      key={otherItem._id}
                    >
                      <img src={otherItem.images[0]} />
                    </Image>
                  ))}
                </GridContainer>
                {sellerOtherItems.length > 6 && (
                  <ButtonSeeAll onClick={onSeeAllClick}>
                    Zobacz wszystkie
                  </ButtonSeeAll>
                )}
              </SellerOtherItems>
            ) : (
              <Info>Sprzedawca nie posiada więcej przedmiotów na sprzedaż</Info>
            )}
          </Seller>
          <MainImageContainer>
            <FakeImage />
            <MainImage src={images[0]} />
          </MainImageContainer>
          <Content>
            <Title>
              {category} {brand} {itemModel ? itemModel : ""}
            </Title>
            <ItemInfo>
              <span>Stan: {condition}</span>
              <span>Rozmiar: {size}</span>
              <span>Cena: {price}PLN</span>
              {description && <Description>{description}</Description>}
            </ItemInfo>
            <ButtonMessage>Napisz wiadomość do sprzedawcy</ButtonMessage>
            {images.length > 1 ? (
              <div>
                <Info>Inne zdjęcia przedmiotu</Info>
                <GridContainer>
                  {images.slice(1).map(otherImage => (
                    <Image key={otherImage}>
                      <img src={otherImage} />
                    </Image>
                  ))}
                </GridContainer>
              </div>
            ) : (
              <Info>Przedmiot nie posiada więcej zdjęć</Info>
            )}
          </Content>
        </div>
      )}
    </Container>
  );
};
export default style(Item);
