import multer from "multer";

export const uploadImage = multer({
  limits: {
    fileSize: 1000000 //1mb
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
