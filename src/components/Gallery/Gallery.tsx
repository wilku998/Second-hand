import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import { IViewStore } from "../../store/view";
import styles, {
  Content,
  MoveButtonContainer,
  Image,
  PositionContainer,
  Circle,
  ButtonsContainer,
  MoveIcon,
  CloseIcon
} from "./styleGallery";
import InvisibleButton from "../Abstracts/InvisibleButton";

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
        <ButtonsContainer>
          <span>{title}</span>
          <InvisibleButton onClick={viewStore.closeGallery}>
            <CloseIcon src="/svg/close.svg" />
          </InvisibleButton>
        </ButtonsContainer>
        <MoveButtonContainer>
          <InvisibleButton onClick={decreasePosition}>
            <MoveIcon src="/svg/left.svg" />
          </InvisibleButton>
        </MoveButtonContainer>
        <Image src={images[position]} />
        <MoveButtonContainer>
          <InvisibleButton onClick={increasePosition}>
            <MoveIcon isright="true" src="/svg/left.svg" />
          </InvisibleButton>
        </MoveButtonContainer>
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
