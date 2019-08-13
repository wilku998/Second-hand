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
  onCleanFiltersClick: (e: any) => void;
}

const ItemInput = ({
  item,
  onSearchMenuButtonClick,
  onInputChange,
  onCleanFiltersClick
}: IProps) => {
  const {
    name,
    isVisible,
    label,
    type,
    value,
    valueFrom,
    valueTo,
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
              <Label>
                <span>Cena od</span>
                <Input
                  type={type}
                  onChange={onInputChange}
                  name={name}
                  value={valueFrom}
                  data-property="valueFrom"
                />
              </Label>
              <Label>
                <span>Cena do</span>
                <Input
                  type={type}
                  onChange={onInputChange}
                  name={name}
                  value={valueTo}
                  data-property="valueTo"
                />
              </Label>
            </Fragment>
          ) : (
            <Input
              type={type}
              onChange={onInputChange}
              name={name}
              value={value}
              data-property="value"
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
