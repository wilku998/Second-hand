import { createGlobalStyle } from "styled-components";
import media from "./media";

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

        ${media.big`
            font-size: 50%;
        `}
    }


    body {
        font-family: 'Lato', sans-serif;
        font-size: 1.4rem;
        line-height: 1.6;
        position: relative;
        ${({ theme }) => `
            color: ${theme.colorGreyDark2};
            // background-color: ${theme.colorGreyLight2};
            background: linear-gradient(to right bottom, ${theme.colorGreyLight1}, ${theme.colorGreyLight3});
            padding-top: ${theme.navigationHeight};
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
        font-size: inherit;
        font-family: inherit;
        &:focus{
            outline: none;
        }
        &:disabled{
            cursor: default;
        }
    }

    input, select, textarea {
      font-family: 'Source Code Pro', monospace;
      border-radius: 0.3rem;
      font-size: 1.4rem;
      color: inherit;
      padding: 0 1rem;
      flex: 1;
      font-size: 1.2rem;
      height: 2rem;
      ${({ theme }) => `
        border: ${theme.lightBorder2};
      `};
        &:focus, &:active{
            outline: none;
        }
    }

    textarea {
        resize: none;
    }
    
    a, a:visited{
        color: inherit;
        text-decoration: none;
        height: 100%;
        display: inline-block;
    };

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        fill: inherit;
    }
`;
