import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/'); // Files will be stored in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only images (JPEG, PNG) are allowed"), false);
    }
};

// Multer instance
export const upload = multer({ storage, fileFilter });
