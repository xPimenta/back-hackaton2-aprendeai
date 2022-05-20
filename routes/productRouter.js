import { Router } from "express";
import { getCategories, getQuestion } from "../controllers/productController.js";

const productRouter = Router();
productRouter.get("/categories", getCategories);
productRouter.get("/question/:id", getQuestion);

export default productRouter;