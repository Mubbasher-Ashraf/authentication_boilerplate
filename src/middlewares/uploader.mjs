import { MulterError } from "multer";
import { multerSetup } from "#services/multer.mjs";

export const uploader = (req, res, next) => {
    multerSetup(req, res, (err) => {
        if (err) {
            return next(new MulterError("Error while uploading file"));
        }
    console.log("moving to next middleware");
    next();
    });
};
