import initialFormState from "./initialFormState";
import { ISelector, ISize, IInput } from "./interfaces";

export const createActiveFiltersObject = (
  selectors: Array<ISelector>,
  name: IInput,
  price: IInput,
  size: ISize
) => {
  const activeFilters: any = {
    selectors: {}
  };

  const checkIfSelectorFilterIsActive = (selector: ISelector) => {
    const activeFilters: Array<string> = [];
    selector.options.forEach(option => {
      if (option.isChecked) {
        activeFilters.push(option.option);
      }
    });
    return activeFilters;
  };

  [...selectors, size].forEach(selector => {
    activeFilters.selectors[selector.name] = checkIfSelectorFilterIsActive(
      selector
    );
  });

  if (name.value.length > 0) {
    activeFilters.name = name.value;
  }
  if (
    (price.valueFrom !== "" &&
      price.valueFrom !== initialFormState.price.valueFrom) ||
    (price.valueTo !== "" && price.valueTo !== initialFormState.price.valueTo)
  ) {
    activeFilters.price = {
      valueFrom: price.valueFrom,
      valueTo: price.valueTo
    };
  }

  if (size.value !== initialFormState.size.value) {
    activeFilters.selectors.size.push(size.value);
  }
  return activeFilters;
};
