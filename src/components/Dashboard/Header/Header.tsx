import React, { useState, useEffect } from "react";
import style, {
  Content,
  Title,
  Description,
  Button,
  Background,
  BackgroundDesc
} from "./styleHeader";
import Logo from "../../Abstracts/Logo";
import images from "./images";

export interface IProps {
  className?: string;
}

const Header = ({ className }: IProps) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(position + 1 > 2 ? 0 : position + 1);
    }, 5000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <header className={className}>
      {images.map((img, imgIndex) => (
        <Background
          key={img.image}
          visible={position === imgIndex}
          src={img.image}
        />
      ))}
      <BackgroundDesc>{images[position].desc}</BackgroundDesc>
      <Content>
        <Logo size="big" squareColor="dark" />
        <Title>Masz w szafie pełno starych, nie noszonych ubrań?</Title>
        <Description>
          W takim razie trafiłeś w odpowiednie miejsce, gdzie możesz dać im
          drugie życie.
        </Description>
        <Button>Zacznij sprzedawać</Button>
      </Content>
    </header>
  );
};
export default style(Header);
