import { Router } from "express";
import { getCategories, getQuestion } from "../controllers/productController.js";

const productRouter = Router();
productRouter.get("/categories", getCategories);
productRouter.get("/questions/:categ", getQuestion);

export default productRouter;