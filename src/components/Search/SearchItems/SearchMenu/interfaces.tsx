
export interface ISelector {
  isVisible: boolean;
  label: string;
  name: string;
  isActive: boolean;
  options: Array<{
    isChecked: boolean;
    option: string;
  }>;
}

export interface IInput {
  name: string;
  isActive: boolean;
  priceFrom?: { value: string; label: string };
  priceTo?: { value: string; label: string };
  value?: string;
  isVisible: boolean;
  label: string;
  type: string;
  placeholder?: string;
}

export interface ISize {
  isVisible: boolean;
  label: string;
  name: string;
  isActive: boolean;
  options: Array<{
    isChecked: boolean;
    option: string;
  }>;
  type: string;
  value: string;
  placeholder: string;
}
