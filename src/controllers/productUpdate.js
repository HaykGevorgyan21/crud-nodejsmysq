import fs from "fs-extra";
import cloudnary from "../cloudnary/storage.js";
import { db } from "../database/db.js";

export async function productUpdate(req, res) {
  const { id } = req.params;
  let product = {};
  if (req.file) {
    const imag_id = await db
      .query("select public_id_img from product where id=?", [id])
      .then((dat) => {
        return dat[0][0].public_id_img;
      });
    const image = req.file.path;
    await cloudnary.uploader.destroy(imag_id);
    const result = await cloudnary.uploader.upload(image, {
      folder: "samples",
    });
    if (!req.body.name) {
      product.img_url = result.secure_url;
      product.public_id_img = result.public_id;
    } else {
      product.img_url = result.secure_url;
      product.public_id_img = result.public_id;
      product.name = req.body.name;
    }
  } else {
    product.name = req.body.name;
  }
  (async () => {
    try {
      await db
        .query("UPDATE product set? where id = ?", [product, id])
        .then((updated) => {
          res.status(200).send("product updated successfully");
        })
        .catch((err) => {
          res.status(204).send("Error");
        });
      let path = req.file.path;
      await fs.remove(path);
    } catch (e) {}
  })();
}
