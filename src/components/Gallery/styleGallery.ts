import styled from "styled-components";
import reactModalStyles from "../../styles/reactModalStyles";
import ReactSVG from "react-svg";
import InvisibleButton from "../Abstracts/InvisibleButton";
import media from "../../styles/media";
import { left, right } from "./utilities";

export default {
  overlay: {
    ...reactModalStyles.overlay,
    backgroundColor: "rgba(0,0,0,.8)"
  },
  content: {
    ...reactModalStyles.content,
    border: "none",
    background: "none",
    boxShadow: "none"
  }
};
export const Content = styled.div`
  width: 80vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
  margin-right: auto;
  padding-right: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ImagesContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: all .3s;
`;

export const StyledImage = styled.img<{
  translateX: number;
  side?: string;
  shouldMainImage0TransformAnimate: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.3rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  justify-self: center;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: flex-end;
  color: white;
  padding: 1rem;
  margin-bottom: 2rem;
  line-height: 1;
  ${({ theme }) => `
    border-bottom: ${theme.lightBorder};
  `}
`;

export const PositionContainer = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Circle = styled.div<{ isActive: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  &:not(:last-child) {
    margin-right: 2rem;
  }
  ${({ theme, isActive }) => `
    border: ${theme.lightBorder};
    background-color: ${isActive ? theme.colorGreyLight1 : "none"};
  `}
`;

export const CloseIcon = styled(ReactSVG)`
  fill: white;
  width: 1.5rem;
  height: 1.5rem;
  ${media.medium_2`
    width: 1rem;
    height: 1rem;
  `}
  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const MoveIcon = styled(CloseIcon)<{ isright?: string }>`
  ${({ isright }) => `
    & svg {
      transform: translate(-50%, -50%) rotate(${isright ? "180deg" : "0deg"});
    }
  `}
`;

export const Button = styled(InvisibleButton)`
  position: relative;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;
