import path from "path";
import { read } from "../utils/fileHandle.js";
async function getImage(req, res) {
  console.log(req);
  const imageName = req.params.imageName;
  const filename = path.join("images", imageName);
  const file = await read(filename);
  res.setHeader("Content-Type", "Image/jpeg");
  res.send(file);
}

const imageController = {
  getImage,
};
export { imageController };
