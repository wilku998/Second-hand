import React from "react";
import style, { List, Text } from "./styleFooter";

export interface IProps {
  className?: string;
}

const Footer = ({ className }: IProps) => (
  <footer className={className}>
    <Text>Aplikacja została stworzona w celach edukacyjnych</Text>
    <List>
      <Text as="li">Bartosz Wilk</Text>
      <Text as="li">Wszelkie prawa zastrzeżone &copy;</Text>
      <Text as="li">Kontakt: bartoszwilk98@wp.pl</Text>
      <Text as="li">
        <a target="_blank" href="https://github.com/wilku998/Second-hand">Kod aplikacji na github</a>
      </Text>
    </List>
  </footer>
);

export default style(Footer);
