import styled from "styled-components";

export const FakeImage = styled.img.attrs(() => ({
  src: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
}))`
  opacity: 0;
  width: initial;
`;
