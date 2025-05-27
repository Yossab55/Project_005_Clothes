import multer from "multer";
import path from "path";
import { unlink } from "fs";
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

async function deleteFile(req) {
  const { destination, filename } = req.file;
  console.log(destination, filename);
  const filePath = path.join(destination, filename);
  await unlink(filePath, (err) => {
    if (err) throw new Error("hello world");
  });
}
export { uploadFile, deleteFile };
