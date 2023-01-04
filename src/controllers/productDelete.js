import cloudnary from "../cloudnary/storage.js";
import { db } from "../database/db.js";
export async function productDelete(req, res) {
  const { id } = req.params;
  try {
    const imag_id = await db
      .query("select public_id_img from product where id=?", [id])
      .then((dat) => {
        return dat[0][0].public_id_img;
      });
    await cloudnary.uploader.destroy(imag_id);

    await db.query("DELETE FROM product WHERE id = ?", [id]).then((updated) => {
      res.status(200).send("product deleted successfully");
    });
  } catch (err) {
    res.status(204).send("Error");
  }
}
