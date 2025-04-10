import mongoose from "mongoose";
import { Product } from "../../models/index.js";

export const productRoutes = [
  {
    method: "get",
    path: "/products",
    handler: async (req, res) => {
      const products = await Product.find();
      res.json([{ name: "produto 1" }]);
    },
  },
  {
    method: "get",
    path: "/products",
    handler: async (req, res) => {
      res.json([{ name: "produto 2" }]);
    },
  },
];

export default productRoutes;
