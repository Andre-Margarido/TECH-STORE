const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  return fetch(`${API_URL}/products`).then((res) => res.json());
};

export const getProductBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/products/${slug}`);
  return res.json();
};
