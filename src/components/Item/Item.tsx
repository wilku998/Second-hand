import React, { useEffect, useState } from "react";
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
  FakeImage,
  MainImageContainer,
  MainImage,
  ButtonSeeAll,
  SellerOtherItems,
  OtherItemDescription
} from "./styleItem";
import Avatar from "../Abstracts/Avatar";
import { getItemRequest } from "../../API/items";

export interface IProps {
  className: string;
  match: any;
}
//gdf312

const Item = ({ className, match }: IProps) => {
  const itemID = match.params.id;
  const [item, setItem] = useState(undefined);
  const [sellerOtherItems, setSellerOtherItems] = useState([]);

  if (item) {
    var { category, brand, size, price, images, owner } = item;
  }
  useEffect(() => {
    const fetchData = async () => {
      const foundedItem = await getItemRequest(itemID);
      if (foundedItem) {
        setItem(foundedItem);
        console.log(foundedItem)
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
                    <Image key={otherItem._id}>
                      <img src={otherItem.images[0]} />
                      <OtherItemDescription>
                        Rozmiar:{otherItem.size} Cena:{otherItem.price}PLN
                      </OtherItemDescription>
                    </Image>
                  ))}
                </GridContainer>
                {sellerOtherItems.length > 6 && (
                  <ButtonSeeAll>Zobacz wszystkie</ButtonSeeAll>
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
              {category} {brand}
            </Title>
            <Description>
              <span>Rozmiar: {size}</span>
              <span>Cena: {price}PLN</span>
            </Description>
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
