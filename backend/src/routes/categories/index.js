import { Category } from "../../models/index.js";

const categoryRoutes = [
  {
    method: "get",
    path: "/categories",
    handler: async (req, res) => {
      const categories = await Category.find();
      res.json(categories);
    },
  },
];

export default categoryRoutes;
