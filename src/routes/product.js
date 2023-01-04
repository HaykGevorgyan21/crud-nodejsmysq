import express from "express";
import upload from "../controllers/uploadcontroller.js";
import { productCreate } from "../controllers/productCreate.js";
import  {productReade}   from "../controllers/productRead.js";
import { productUpdate } from "../controllers/productUpdate.js";
import { productDelete } from "../controllers/productDelete.js";
import { productSearch } from "../controllers/productSearch.js";

const router = express.Router();

router.post("/product", upload.single("image"), productCreate);
router.get("/product", productReade);
router.patch("/update/:id", upload.single("image"), productUpdate);
router.delete("/delete/:id", productDelete);
router.get("/search/:keyword", productSearch);

export default router;
