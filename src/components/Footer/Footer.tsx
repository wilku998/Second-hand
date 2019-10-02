import React, { useState, useRef, useLayoutEffect } from "react";
import { List, About, ListItem, StyledFooter } from "./styleFooter";

const Footer = () => {
  const [marginTop, setMarginTop] = useState(false);
  const componentRef = useRef();

  const calculateMargin = () => {
    const bodyHeight = document.querySelector("body").clientHeight;
    const componentHeight = componentRef.current.clientHeight;
    const windowHeight = window.innerHeight;
    setMarginTop(bodyHeight - componentHeight > windowHeight);
  };

  useLayoutEffect(() => {
    calculateMargin();
    window.addEventListener("resize", calculateMargin);
    return () => {
      window.removeEventListener("resize", calculateMargin);
    };
  }, []);

  return (
    <StyledFooter marginTop={marginTop} ref={componentRef}>
      <About>Aplikacja została stworzona w celach edukacyjnych</About>
      <List>
        <ListItem>Bartosz Wilk</ListItem>
        <ListItem>Wszelkie prawa zastrzeżone &copy;</ListItem>
        <ListItem>Kontakt: bartoszwilk98@wp.pl</ListItem>
        <ListItem>
          <a target="_blank" href="https://github.com/wilku998/Second-hand">
            Kod aplikacji na github
          </a>
        </ListItem>
      </List>
    </StyledFooter>
  );
};

export default Footer;
