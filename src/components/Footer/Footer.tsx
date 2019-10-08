import React from "react";
import { List, About, ListItem, StyledFooter } from "./styleFooter";

const Footer = () => {
  return (
    <StyledFooter>
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
