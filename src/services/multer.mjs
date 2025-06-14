import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_UPLOAD_PATH = join(__dirname, "/../../public/uploads");

const storage = multer.diskStorage({
    destination: function (_, file, cb) {
        cb(null, DEFAULT_UPLOAD_PATH);
    },
    filename: function (_, file, cb) {
        console.log("multer storage middleware ----->", { file });
        const customFileName = randomBytes(18).toString("hex"),
            originalname = file.originalname,
            fileExtension =
                originalname.substring(
                    originalname.lastIndexOf(".") + 1,
                    originalname.length,
                ) || originalname;
        cb(null, customFileName + "." + fileExtension);
    },
});

export const multerSetup = multer({ storage }).any();
