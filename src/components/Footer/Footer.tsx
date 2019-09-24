import React from "react";
import style, { List, About, ListItem } from "./styleFooter";

export interface IProps {
  className?: string;
}

const Footer = ({ className }: IProps) => (
  <footer className={className}>
    <About>Aplikacja została stworzona w celach edukacyjnych</About>
    <List>
      <ListItem>Bartosz Wilk</ListItem>
      <ListItem>Wszelkie prawa zastrzeżone &copy;</ListItem>
      <ListItem>Kontakt: bartoszwilk98@wp.pl</ListItem>
      <ListItem>
        <a target="_blank" href="https://github.com/wilku998/Second-hand">Kod aplikacji na github</a>
      </ListItem>
    </List>
  </footer>
);

export default style(Footer);
