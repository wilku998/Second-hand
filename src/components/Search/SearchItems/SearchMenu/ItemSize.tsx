import React, { ChangeEvent } from "react";
import {
  Label,
  Input,
  SearchMenuButton,
  InputContainer,
  CheckLabel,
  ButtonCleanFilter,
  Item
} from "./styleSearchMenu";
import { ISize } from "./interfaces";

interface IProps {
  size: ISize;
  isSizeInputVisible: boolean;
  isSizeSelectorVisible: boolean;
  onSelectorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchMenuButtonClick: (e: any) => void;
  onCleanFiltersClick: (e: any) => void;
}

const ItemSize = ({
  size,
  onSearchMenuButtonClick,
  isSizeInputVisible,
  isSizeSelectorVisible,
  onInputChange,
  onSelectorChange,
  onCleanFiltersClick
}: IProps) => {
  const { label, isVisible, options, value, name, placeholder, type } = size;
  return (
    <Item>
      <SearchMenuButton name="size" onClick={onSearchMenuButtonClick}>
        {label}
      </SearchMenuButton>
      {isVisible && (
        <InputContainer>
          {isSizeInputVisible && (
            <Label>
              {isSizeSelectorVisible && <span>Rozmiar obuwia</span>}
              <Input
                type={type}
                onChange={onInputChange}
                name={name}
                value={value}
                placeholder={placeholder}
              />
            </Label>
          )}
          {isSizeSelectorVisible && (
            <Label>
              {isSizeInputVisible && <span>Rozmiar ubrań</span>}
              {options.map(option => (
                <CheckLabel key={option.option}>
                  <input
                    type="checkbox"
                    name={name}
                    data-option={option.option}
                    checked={option.isChecked}
                    onChange={onSelectorChange}
                  />
                  <span>{option.option}</span>
                </CheckLabel>
              ))}
            </Label>
          )}

          <ButtonCleanFilter name={name} onClick={onCleanFiltersClick}>
            Usuń filtr
          </ButtonCleanFilter>
        </InputContainer>
      )}
    </Item>
  );
};

export default ItemSize;
