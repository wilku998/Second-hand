import styled from "styled-components";
import reactModalStyles from "../../styles/reactModalStyles";
import ReactSVG from "react-svg";
import InvisibleButton from "../Abstracts/InvisibleButton";
import media from "../../styles/media";

export default {
  overlay: {
    ...reactModalStyles.overlay,
    backgroundColor: "rgba(0,0,0,.8)"
  },
  content: {
    ...reactModalStyles.content,
    border: "none",
    background: "none"
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

export const Image = styled.img`
  border-radius: 0.3rem;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
  width: auto;
  max-width: 100%;
  overflow: hidden;
  object-fit: contain;
  justify-self: center;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: flex-end;
  color: white;
  padding: 1rem 0;
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
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const MoveIcon = styled(CloseIcon)<{ isright?: string }>`
  ${({ isright }) => `
    transform: rotate(${isright ? "180deg" : "0deg"});
  `}
`;

export const Button = styled(InvisibleButton)`
  position: relative;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;
