import { Router } from "express";
import { getCategories, getQuestion, postAnswer } from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/categories", getCategories);
productRouter.get("/questions/:categ", getQuestion);
productRouter.post("/answer", postAnswer);

export default productRouter;