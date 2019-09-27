import multer from "multer";
import { IMatch } from "../interfaces";

export const parseNumber = (number: any) =>
  number ? parseInt(number) : undefined;

export const uploadImage = multer({
  limits: {
    fileSize: 10000000 //10mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
      cb(new Error("Incorrect file extension."), false);
    }
    cb(undefined, true);
  }
});

export const createRegexObj = (query: string) => ({
  $regex: new RegExp(query.trim().replace(/_/g, "|")),
  $options: "i"
});

export const createQueryUsers = (name?: string) =>
  name
    ? {
        name: createRegexObj(name)
      }
    : {};

export const createQueryItems = (query: any) => {
  const { priceFrom, priceTo, name, owner } = query;

  let match: IMatch = {
    price: {
      $gte: priceFrom ? parseInt(priceFrom) : 0,
      $lte: priceTo ? parseInt(priceTo) : 10000
    }
  };

  Object.keys(query).forEach(
    (
      key:
        | "size"
        | "gender"
        | "category"
        | "name"
        | "owner"
        | "priceFrom"
        | "priceTo"
        | "condition"
        | "limit"
        | "skip"
        | "order"
        | "sortBy"
    ) => {
      if (
        key !== "priceFrom" &&
        key !== "priceTo" &&
        key !== "skip" &&
        key !== "limit" &&
        key !== "sortBy" &&
        key !== "order"
      ) {
        if (key === "name") {
          match = {
            ...match,
            $or: [
              { itemModel: createRegexObj(name) },
              { brand: createRegexObj(name) }
            ]
          };
        } else if (key === "owner") {
          match.owner = owner;
        } else {
          match[key] = createRegexObj(query[key]);
        }
      }
    }
  );
  return match;
};
