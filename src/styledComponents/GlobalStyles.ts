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
        font-size: 1.6rem;
        line-height: 1.6;
        position: relative;
        background: url('./images/header-background.jpg') center/cover no-repeat;
        min-height: 90vh;
        ${({ theme }) => `
        `}
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    button {
        cursor: pointer;
        border: none;
        font-family: inherit;
        &:focus{
            outline: none;
        }
        &:disabled{
            cursor: default;
        }
    }

    input {
        &:focus{
            outline: none;
        }
    }
    a, a:visited{
        color: inherit;
        text-decoration: none;
    };
`;
