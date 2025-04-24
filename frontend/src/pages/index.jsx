import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProducts } from "../services/products";
import { useLocation } from "react-router";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // extrair ?category=valor da URL
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    getProducts().then((res) => {
      if (categoryFilter) {
        const filtered = res.filter(
          (product) =>
            product.category?.name?.toLowerCase() ===
            categoryFilter.toLowerCase()
        );
        setProducts(filtered);
      } else {
        setProducts(res);
      }
    });
  }, [categoryFilter]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product, key) => (
            <Product
              key={`${product._id}-${key}`}
              name={product.name}
              images={product.images}
              category={product.category}
              price={product.price}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
