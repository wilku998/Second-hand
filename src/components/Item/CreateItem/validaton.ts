import { isSelectSize } from "./functions";

export default (value: string, property: string, secondProperty?: string) => {
  switch (property) {
    case "itemModel": {
      return value.length <= 20;
    }
    case "price": {
      const number = parseFloat(value);
      console.log(number >= 1 && number <= 10000)
      return number >= 1 && number <= 10000;
    }
    case "size": {
      if (!isSelectSize(secondProperty)) {
        const number = parseInt(value);
        return number > 16 && number < 50;
      } else {
        return true;
      }
    }
    case "brand": {
      return value.length>=1 && value.length <= 20;
    }

    case "description": {
      const wordsValidation = value.split(" ").findIndex(e => e.length>25) === -1
      return value.length <= 100 && wordsValidation;
    }
    default: {
      return true
    }
  }
};
