import React, { useState, useRef, useLayoutEffect } from "react";
import { List, About, ListItem, StyledFooter } from "./styleFooter";
import { history } from "../../app";

const Footer = () => {
  const [marginTop, setMarginTop] = useState(false);
  const componentRef = useRef();

  const calculateMargin = (bodyHeight: number) => {
    const component = componentRef.current;
    const componentHeight = component.clientHeight;
    const windowHeight = window.innerHeight - 20;
    setMarginTop(bodyHeight - componentHeight >= windowHeight);
  };

  useLayoutEffect(() => {
    const x = new ResizeObserver(e =>
      calculateMargin(e[0].target.clientHeight)
    );

    x.observe(document.querySelector("body"));
    return () => {
      x.disconnect();
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
