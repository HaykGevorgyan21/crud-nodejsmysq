import fs from "fs-extra";
import cloudnary from "../cloudnary/storage.js";
import { db } from "../database/db.js";

export async function productCreate(req, res) {
  try {
    const image = req.file.path;

    const result = await cloudnary.uploader.upload(image, {
      folder: "samples",
    });
    const newProduct = {
      name: req.body.name,
      img_url: result.secure_url,
      public_id_img: result.public_id,
    };

    await db
      .query("INSERT INTO product set ?", [newProduct])
      .then(() => {
        res.status(200).send("product created");
      })
      .catch((err) => {
        res.status(204).send("Error");
      });
    let path = req.file.path;
    await fs.remove(path);
  } catch (e) {}
}
