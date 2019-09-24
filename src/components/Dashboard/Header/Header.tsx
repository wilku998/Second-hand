import React from "react";
import { inject, observer } from "mobx-react";
import style, {
  Content,
  Title,
  Description,
  Button,
  BackgroundDesc,
  HeaderLogo
} from "./styleHeader";
import Logo from "../../Abstracts/Logo";
import { IUserStore } from "../../../store/user";
import { history } from "../../../app";

export interface IProps {
  className?: string;
  userStore?: IUserStore
}

const Header = ({ className, userStore }: IProps) => {
  const isAuth = userStore.isAuth;

  const onStartSellClick = () => {
    if(isAuth){
      history.push("/items/create");
    }else{
      history.push("/login")
    }
  };

  return (
    <header className={className}>
      {/* <BackgroundDesc>Eo eoeo eo</BackgroundDesc> */}
      <Content>
        <HeaderLogo />
        <Title>Masz w szafie pełno starych, nie noszonych ubrań?</Title>
        <Description>
          W takim razie trafiłeś w odpowiednie miejsce, gdzie możesz dać im
          drugie życie.
        </Description>
        <Button onClick={onStartSellClick}>Zacznij sprzedawać</Button>
      </Content>
    </header>
  );
};
export default inject("userStore")(observer(style(Header)));
