import React, { useContext } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { CartContext } from "../context/cart";

export default function CartProduct({ product }) {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, deleteFromCart } = useContext(CartContext);

  return (
    <div className="flex gap-4 p-4 items-center border-b">
      <img
        onClick={() => navigate(`/products/${product.slug}`)}
        src={product.images[0]}
        alt={product.name}
        className="w-24 h-24 object-contain rounded-xl cursor-pointer"
      />
      <div className="flex-1">
        <h3
          className="text-lg font-semibold cursor-pointer"
          onClick={() => navigate(`/products/${product.slug}`)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">€{product.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            className="cursor-pointer"
            disabled={product.quantity <= 1}
            onClick={() => removeFromCart(product._id)}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium">{product.quantity}</span>
          <button className="cursor-pointer" onClick={() => addToCart(product)}>
            <Plus className="w-4 h-4" />
          </button>
          <button
            className="ml-4 text-red-500 cursor-pointer"
            onClick={() => deleteFromCart(product._id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-md font-semibold">
          €{(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
