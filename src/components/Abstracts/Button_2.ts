import styled from "styled-components";

export default styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  border: none;

  ${({ theme }) => `
        background-color: ${theme.colorBlue3};
        color: ${theme.colorGreyLight2};
        &:disabled{
          background-color: ${theme.colorBlue2};
        }
    `}
`;
