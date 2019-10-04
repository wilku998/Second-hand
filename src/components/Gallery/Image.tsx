import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { StyledImage, ImageContainer, ImagesContainer } from "./styleGallery";

interface IProps {
  images: string[];
  position: number;
  decreasePosition: () => void;
  increasePosition: () => void;
}

export default ({
  position,
  decreasePosition,
  increasePosition,
  images
}: IProps) => {
  const ref = useRef();
  const [translateX, setTranslateX] = useState(0);

  const onTouchListiner = (
    event: any,
    eventProperty: "touches" | "changedTouches",
    initialX: number,
    currentSmallerCallback: any,
    currentGreaterCallBack: any
  ) => {
    const currentX = event[eventProperty][0].clientX;
    const diff = initialX - currentX;
    if (Math.abs(diff) > 20) {
      if (currentX < initialX) {
        currentSmallerCallback(-20);
      } else if (currentX > initialX) {
        currentGreaterCallBack(20);
      }
    }
  };

  useLayoutEffect(() => {
    const image = ref.current;
    let initialX = 0;

    const onTouchStart = e => {
      initialX = e.touches[0].clientX;
    };

    const onTouchEnd = e => {
      setTranslateX(0);
      onTouchListiner(
        e,
        "changedTouches",
        initialX,
        increasePosition,
        decreasePosition
      );
    };

    const onTouchMove = e => {
      onTouchListiner(e, "touches", initialX, setTranslateX, setTranslateX);
    };

    const onKeyDown = e => {
      const { keyCode } = e;
      if (keyCode === 37) {
        decreasePosition();
      } else if (keyCode === 39) {
        increasePosition();
      }
    };

    image.addEventListener("touchstart", onTouchStart);
    image.addEventListener("touchend", onTouchEnd);
    image.addEventListener("touchmove", onTouchMove);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      image.removeEventListener("touchstart", onTouchStart);
      image.removeEventListener("touchend", onTouchEnd);
      image.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images, position]);

  return (
    <ImagesContainer ref={ref}>
      {images.map((img, i) => (
        <ImageContainer
          key={img}
          style={{
            transform: `translateX(${i -
              position}00%) translateX(${translateX}px)`
          }}
        >
          <StyledImage src={img} position={position} />
        </ImageContainer>
      ))}
    </ImagesContainer>
  );
};
