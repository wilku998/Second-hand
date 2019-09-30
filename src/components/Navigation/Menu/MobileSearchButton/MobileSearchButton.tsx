import React from "react";
import { MenuItemSearchMobile } from "./styleMobileSearchButton";
import { SubMenuButton, ButtonIcon } from "../styleMenu";

interface IProps {
  mobileSearchVisible: boolean;
  onMobileSearchClick: () => void;
  ref: any;
}

const MobileSearchButton = React.forwardRef(
  ({ mobileSearchVisible, onMobileSearchClick }: IProps, ref) => {
    return (
      <MenuItemSearchMobile
        isselected={mobileSearchVisible.toString()}
        ref={ref}
        onClick={onMobileSearchClick}
      >
        <SubMenuButton>
          <ButtonIcon src="/svg/search.svg" />
        </SubMenuButton>
      </MenuItemSearchMobile>
    );
  }
);

export default MobileSearchButton;
