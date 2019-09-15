import React, { ChangeEvent, useRef, useEffect } from "react";
import style, {
  Button,
  ItemsContainer,
  ActiveFilter,
  RemoveActiveFilterButton,
  SmallTitle,
  ActiveFilters
} from "./styleSearchMenu";
import ItemInput from "./ItemInput";
import ItemSelector from "./ItemSelector";
import ItemSize from "./ItemSize";
import ReactSVG from "react-svg";
import initialFormState from "../initialFormState";
import { ISearchItemsQuery } from "../../../../interfaces/ISearchItemsQuery";
import SortContainer from "../../SortContainer/SortContainer";

export interface IProps {
  className?: string;
  sortBy: string;
  sortByOptions: Array<string>;
  onSortByChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  form: any;
  activeFilters: ISearchItemsQuery["query"];
  setForm: (form: any) => void;
  searchItems: () => void;
  count: number;
}

const SearchMenu = ({
  className,
  sortBy,
  sortByOptions,
  onSortByChange,
  form,
  setForm,
  searchItems,
  activeFilters,
  count
}: IProps) => {
  const { category, condition, gender, price, name, size } = form;

  const refs = {
    category: useRef(),
    condition: useRef(),
    gender: useRef(),
    price: useRef(),
    name: useRef(),
    size: useRef()
  };

  const selectors = [gender, category, condition];
  const inputs = [price, name];

  const isCatgoryFilterUnactive =
    activeFilters.findIndex(e => e.name === "category") < 0;

  const isSizeInputVisible =
    category.options.findIndex(e => e.isChecked && e.option === "buty") > -1 ||
    isCatgoryFilterUnactive;

  const isSizeSelectorVisible =
    isCatgoryFilterUnactive ||
    category.options.filter(e => e.option !== "buty" && e.isChecked).length > 0;

  const onSearchMenuButtonClick = (e: any) => {
    const { name } = e.target;
    const newForm: any = {};
    Object.keys(form).forEach(key => {
      newForm[key] = {
        ...form[key],
        isVisible: key === name ? !form[key].isVisible : false
      };
    });
    setForm(newForm);
  };

  const onSelectorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { option } = e.target.dataset;
    let isChecked: boolean;
    const newForm = {
      ...form,
      [name]: {
        ...form[name],
        options: form[name].options.map(e => {
          if (e.option === option) {
            isChecked = !e.isChecked;
          }
          return {
            option: e.option,
            isChecked: e.option === option ? !e.isChecked : e.isChecked
          };
        })
      }
    };

    if (name === "category") {
      if (
        (option === "buty" && !isChecked) ||
        (isChecked && option !== "buty" && isCatgoryFilterUnactive)
      ) {
        newForm.size.value = initialFormState.size.value;
      }
      if (isChecked && option === "buty" && isCatgoryFilterUnactive) {
        newForm.size.options = initialFormState.size.options;
      }
      //
    }
    setForm(newForm);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value
      }
    });
  };

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      price: {
        ...price,
        [name]: {
          ...price[name],
          value
        }
      }
    });
  };

  const onCleanFiltersClick = (e: any) => {
    const { name } = e.currentTarget;

    if (name === "priceFrom" || name === "priceTo") {
      setForm({
        ...form,
        price: {
          ...form.price,
          [name]: initialFormState.price[name]
        }
      });
    } else {
      setForm({
        ...form,
        [name]: initialFormState[name]
      });
    }
  };

  useEffect(() => {
    const listner = (e: Event) => {
      if (
        Object.keys(refs).every(key => !refs[key].current.contains(e.target))
      ) {
        const newForm: any = {};
        Object.keys(form).forEach(key => {
          newForm[key] = {
            ...form[key],
            isVisible: false
          };
        });
        setForm(newForm);
      }
    };
    window.addEventListener("click", listner);
    return () => {
      window.removeEventListener("click", listner);
    };
  }, [form]);

  return (
    <nav className={className}>
      <ItemsContainer>
        {inputs.map(item => (
          <ItemInput
            key={item.name}
            item={item}
            onSearchMenuButtonClick={onSearchMenuButtonClick}
            onInputChange={onInputChange}
            onPriceChange={onPriceChange}
            onCleanFiltersClick={onCleanFiltersClick}
            ref={refs[item.name]}
          />
        ))}
        <ItemSize
          size={size}
          isSizeInputVisible={isSizeInputVisible}
          isSizeSelectorVisible={isSizeSelectorVisible}
          onInputChange={onInputChange}
          onSelectorChange={onSelectorChange}
          onSearchMenuButtonClick={onSearchMenuButtonClick}
          onCleanFiltersClick={onCleanFiltersClick}
          ref={refs.size}
        />
        {selectors.map(item => (
          <ItemSelector
            key={item.name}
            item={item}
            onSearchMenuButtonClick={onSearchMenuButtonClick}
            onCleanFiltersClick={onCleanFiltersClick}
            onSelectorChange={onSelectorChange}
            ref={refs[item.name]}
          />
        ))}
      </ItemsContainer>
      <Button onClick={searchItems}>Szukaj przedmiotów</Button>
      {activeFilters.length > 0 && (
        <ActiveFilters>
          <SmallTitle>Aktywne filtry</SmallTitle>
          {activeFilters.map(e => (
            <ActiveFilter key={e.name}>
              <RemoveActiveFilterButton
                name={e.name}
                onClick={onCleanFiltersClick}
              >
                <ReactSVG src="/svg/close.svg" />
              </RemoveActiveFilterButton>
              {e.label}: {e.selectedFilters.join(" | ")}
            </ActiveFilter>
          ))}
        </ActiveFilters>
      )}
      <SortContainer
        count={count}
        sortBy={sortBy}
        sortByOptions={sortByOptions}
        onSortByChange={onSortByChange}
      />
    </nav>
  );
};

export default style(SearchMenu);
