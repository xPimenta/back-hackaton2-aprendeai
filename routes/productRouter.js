import { Router } from "express";
import { getCategories, getQuestion } from "../controllers/productController.js";

const productRouter = Router();
productRouter.get("/categories", getCategories);
// productRouter.get("/questions/:id", getQuestion);
productRouter.get("/questions", getQuestion);

export default productRouter;