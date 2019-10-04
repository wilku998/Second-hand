import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import { IViewStore } from "../../store/view";
import styles, {
  Content,
  PositionContainer,
  Circle,
  MoveIcon,
  CloseIcon,
  Title,
  Button,
  Nav
} from "./styleGallery";
import Image from "./Image";

interface IProps {
  viewStore?: IViewStore;
}

const Gallery = ({ viewStore }: IProps) => {
  const galleryData = viewStore.getGalleryData;
  const { isOpen, defaultPosition, images, title } = galleryData;
  const [position, setPosition] = useState(defaultPosition);

  const increasePosition = () => {
    if (position < images.length - 1) {
      setPosition(position + 1);
    }
  };

  const decreasePosition = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  useEffect(() => {
    setPosition(defaultPosition);
  }, [defaultPosition]);

  return (
    <Modal
      style={styles}
      isOpen={isOpen}
      onRequestClose={viewStore.closeGallery}
    >
      <Content>
        <Nav>
          <Title>{title}</Title>
          <Button onClick={decreasePosition}>
            <MoveIcon src="/svg/left.svg" />
          </Button>
          <Button onClick={increasePosition}>
            <MoveIcon isright="true" src="/svg/left.svg" />
          </Button>
          <Button onClick={viewStore.closeGallery}>
            <CloseIcon src="/svg/close.svg" />
          </Button>
        </Nav>
        <Image
          increasePosition={increasePosition}
          decreasePosition={decreasePosition}
          position={position}
          images={images}
        />
        <PositionContainer>
          {images.map((e, i) => (
            <Circle key={e} isActive={i === position} />
          ))}
        </PositionContainer>
      </Content>
    </Modal>
  );
};

export default inject("viewStore")(observer(Gallery));
