import React, { Fragment, ChangeEvent } from "react";
import {
  Label,
  Input,
  SearchMenuButton,
  InputContainer,
  ButtonCleanFilter,
  Item
} from "./styleSearchMenu";
import { IInput } from "./interfaces";

interface IProps {
  item: IInput;
  onSearchMenuButtonClick: (e: any) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCleanFiltersClick: (e: any) => void;
}

const ItemInput = ({
  item,
  onSearchMenuButtonClick,
  onInputChange,
  onCleanFiltersClick,
  onPriceChange
}: IProps) => {
  const {
    name,
    isVisible,
    label,
    type,
    value,
    placeholder
  } = item;
  return (
    <Item key={name}>
      <SearchMenuButton name={name} onClick={onSearchMenuButtonClick}>
        {label}
      </SearchMenuButton>
      {isVisible && (
        <InputContainer>
          {name === "price" ? (
            <Fragment>
              {["priceFrom", "priceTo"].map((key: "priceFrom" | "priceTo") => (
                <Label key={item[key].label}>
                  <span>{item[key].label}</span>
                  <Input
                    type={type}
                    onChange={onPriceChange}
                    name={key}
                    value={item[key].value}
                  />
                </Label>
              ))}
            </Fragment>
          ) : (
            <Input
              type={type}
              onChange={onInputChange}
              name={name}
              value={value}
              placeholder={placeholder}
            />
          )}
          <ButtonCleanFilter name={name} onClick={onCleanFiltersClick}>
            Usuń filtr
          </ButtonCleanFilter>
        </InputContainer>
      )}
    </Item>
  );
};

export default ItemInput;
