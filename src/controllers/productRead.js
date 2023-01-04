import { db } from "../database/db.js";
export async function productReade(req, res) {
    await db.query('SELECT * FROM product').then((data) => {

        res.status(200).send(data[0]);


    }).catch(err => {
        res.status(404).send("404 not found")

    })

}

