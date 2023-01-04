import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/product.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server on port ${process.env.PORT}`);
});
