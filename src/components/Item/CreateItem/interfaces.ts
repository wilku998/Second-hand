export interface Iimages {
  images: Array<{ image: string; name: string }>;
}
export interface IItemKeys {
  keys:
    | "price"
    | "size"
    | "category"
    | "brand"
    | "itemModel"
    | "description"
    | "condition"
    | "gender"
}
export interface IUpdate {
  price?: number;
  size?: string;
  category?:
    | "buty"
    | "bluza"
    | "spodnie"
    | "szorty"
    | "kurtka"
    | "plaszcz"
    | "koszulka"
    | "koszula"
    | "marynarka"
    | "czapka"
    | "skarpetki"
    | "bielizna"
    | "biżuteria"
    | "inne";
  brand?: string;
  itemModel?: string;
  description?: string;
  gender?: "mężczyźni" | "kobiety" | "dzieci";
  condition?: "nowy" | "używany";
  images?: Array<string>;
}

export interface IForm {
  price: {
    isOptional: false;
    name: "price";
    value: number;
    valid: boolean;
    label: "Cena";
    type: "number";
    errorMessage: "Podana cena jest nieprawidłowa";
  };
  size: {
    isOptional: false;
    name: "size";
    value: string;
    valid: boolean;
    label: "Rozmiar";
    type: "number";
    options: ["ONE-SIZE", "XS", "S", "M", "L", "XL", "XXL"];
    errorMessage: "Podany rozmiar jest nieprawidłowy";
  };
  category: {
    isOptional: false;
    name: "category";
    value:
      | "buty"
      | "bluza"
      | "spodnie"
      | "szorty"
      | "kurtka"
      | "plaszcz"
      | "koszulka"
      | "koszula"
      | "marynarka"
      | "czapka"
      | "skarpetki"
      | "bielizna"
      | "biżuteria"
      | "inne";
    valid: boolean;
    options: [
      "buty",
      "bluza",
      "spodnie",
      "szorty",
      "kurtka",
      "plaszcz",
      "koszulka",
      "koszula",
      "marynarka",
      "czapka",
      "skarpetki",
      "bielizna",
      "biżuteria",
      "inne"
    ];
    label: "Kategoria";
  };
  brand: {
    isOptional: false;
    name: "brand";
    value: string;
    valid: boolean;
    label: "Marka";
    type: "text";
    errorMessage: "Nazwa marki musi posiadać conajmniej 1 znak oraz mniej niż 21";
  };
  itemModel: {
    isOptional: true;
    name: "itemModel";
    value: string;
    valid: boolean;
    label: "Model";
    type: "text";
    errorMessage: "Nazwa modelu nie może posiadać więcej niż 21 znaków lecz może pozostać pusta";
  };
  description: {
    isOptional: false;
    name: "description";
    value: string;
    valid: boolean;
    errorMessage: "Opis może pozostać pusty lecz nie może posiadać więcej niż 100 znaków oraz więcej niż 25 znaków na słowo";
  };
  condition: {
    isOptional: false;
    name: "condition";
    value: "nowy" | "używany";
    label: "Stan";
    options: ["nowy", "używany"];
    valid: boolean;
  };
  gender: {
    isOptional: false;
    name: "gender";
    value: "mężczyźni" | "kobiety" | "dzieci";
    label: "Płeć";
    options: ["mężczyźni", "kobiety", "dzieci"];
    valid: boolean;
  };
}
