import { db } from "../database/db.js";

export async function productSearch(req, res) {
  let keyword;
  keyword = req.params.keyword;
  await db
    .query("SELECT * FROM product WHERE name LIKE ?", `${keyword}` + "%")
    .then((data) => {
      if (data[0].length > 0) {
        res.status(200).send(data[0]);
      } else {
        throw err;
      }
    })
    .catch((err) => {
      res.status(404).send("not found");
    });
}
