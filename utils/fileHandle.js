import multer from "multer";
import path from "path";
const destination = "./images";
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, destination);
  },
  filename: (req, file, callback) => {
    const signature = Math.round(Math.random() * 1e9) + "" + Date.now();
    const extension = path.extname(file.originalname);

    const filename = signature + extension;
    callback(null, filename);
  },
});

const upload = multer({ storage: storage });

function uploadFile(formName) {
  return upload.single(formName);
}
export { uploadFile };
