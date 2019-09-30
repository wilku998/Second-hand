import styled from "styled-components";
import Loader from "../../Abstracts/Loader";

export const AvatarFileInput = styled.div`
  position: relative;
  flex: 1;
  & > input {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0%;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

export const AvatarFakeButton = styled.div`
  line-height: 1.15;
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => `
    border: ${theme.lightBorder2};
    background: none;
  `}
  font-size: 1.4rem;
`;

export const AvatarLoader = styled(Loader)`
  position: relative;
  top: 0;
  left: 0;
  transform: none;
  margin-right: 1.5rem;
`;
