export const getProducts = async () => {
  return fetch("http://localhost:3000/products").then((res) => res.json());
};

export const getProductBySlug = async (slug) => {
  const res = await fetch(`http://localhost:3000/products/${slug}`);
  return res.json();
};
