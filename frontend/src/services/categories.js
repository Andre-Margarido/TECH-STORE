const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
  return fetch(`${API_URL}/categories`).then((res) => res.json());
};
