import productRoutes from "./products/index.js";

const routes = [...productRoutes];

export function loadRoutes(app) {
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
}
export default loadRoutes;
