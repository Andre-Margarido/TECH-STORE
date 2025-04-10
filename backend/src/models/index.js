import mongoose from "mongoose";
import { productSchema } from "./product.js";
import { categorySchema } from "./category.js";

export const Category = mongoose.model("categories", categorySchema);
export const Product = mongoose.model("products", productSchema);
