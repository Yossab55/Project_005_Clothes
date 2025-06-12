import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { promisify } from "util";
const destination = "./images";
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ storage: storage });

function uploadFile(formName) {
  return upload.single(formName);
}

async function deleteFileFrom(req) {
  const { destination, filename } = req.file;
  const filePath = path.join(destination, filename);
  await unlink(filePath);
}

async function deleteFileBy(filename) {
  const filePath = path.join(__dirname, "..", filename);
  console.log(filePath);
  await unlink(filePath);
}

async function read(filename) {
  const result = await readFile(filename);
  return result;
}
export { uploadFile, deleteFileFrom, deleteFileBy, read };
