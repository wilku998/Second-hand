import styled from "styled-components";
import Button_2 from "../Abstracts/Button_2";

export default {
  content: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "2rem"
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0, .5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export const Button = styled(Button_2)`
  margin-top: 1rem;
`;