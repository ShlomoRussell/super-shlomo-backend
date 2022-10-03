import { Router } from "express";
import fileUpload from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import { join } from "path";
import { addItem, getAllItems, getItem } from "../bls/items.bl.js";
import { getCategories } from "../dals/items.schema.js";

const itemsRouter = Router();

itemsRouter.use(fileUpload({ createParentPath: true }));
itemsRouter.get("/allItems", async (req, res) => {
  try {
    const items = await getAllItems();
    res.send(items);
  } catch (error) {
    return res.sendStatus(500);
  }
});

itemsRouter.get("/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    return res.send(categories);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

itemsRouter.post("/addItem", async (req, res) => {
  let newFileName;
  if (req.files) {
    const uploadedfile = req.files.picture;
    const originalFileExtension = uploadedfile.name.split(".")[1];
    const fileExtension =
      originalFileExtension == "jfif" ? "jpeg" : originalFileExtension;
    newFileName = uuidv4() + "." + fileExtension;
    const uploadPath = join(process.cwd(), "/uploads/", newFileName);

    uploadedfile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
  }
  try {
    const newItem = await addItem({ ...req.body, picture: newFileName });
    return res.send(newItem);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

itemsRouter.get("/:item", async (req, res) => {
  try {
    const item = await getItem(req.params.item);
    return res.send(item);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default itemsRouter;
