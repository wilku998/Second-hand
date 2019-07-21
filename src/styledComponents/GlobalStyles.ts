import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    ul, ol {
        list-style: none;
    }

    h1, h2, h3, h4, h5 {
        margin: 0;
    }

    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
    }


    body {
        font-family: 'Source Code Pro', monospace;
        font-size: 1.4rem;
        line-height: 1.6;
        position: relative;
        padding-top: 4.5rem;
        ${({ theme }) => `
            color: ${theme.colorGreyDark2};
            background-color: ${theme.colorGreyLight2};
        `}
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    button {
        cursor: pointer;
        color: inherit;
        font-family: inherit;
        &:focus{
            outline: none;
        }
        &:disabled{
            cursor: default;
        }
    }

    input {
      border-radius: 0.3rem;
      font-size: 1.4rem;
      color: inherit;

      ${({ theme }) => `
        border: ${theme.lightBorder2}
      `};
        &:focus{
            outline: none;
        }
    }
    a, a:visited{
        color: inherit;
        text-decoration: none;
        height: 100%;
        display: inline-block;
    };
`;
