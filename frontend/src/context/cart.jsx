import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  total: 0,
  quantity: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
});

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const saveLocalStorage = (items, total, quantity) => {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items,
        total,
        quantity,
      })
    );
  };

  const calculateTotals = (items) => {
    return items.reduce(
      (prev, curr) => ({
        totalPrice: curr.price * curr.quantity + prev.totalPrice,
        quantity: curr.quantity + prev.quantity,
      }),
      { quantity: 0, totalPrice: 0 }
    );
  };

  const addToCart = (product) => {
    const cartProduct = cartItems.find(
      (cartItem) => cartItem._id === product._id
    );

    let updatedCart;

    if (cartProduct) {
      updatedCart = cartItems.map((cartItem) =>
        cartItem._id === cartProduct._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    const { totalPrice, quantity } = calculateTotals(updatedCart);
    setCartItems(updatedCart);
    setTotal(totalPrice);
    setQuantity(quantity);
    saveLocalStorage(updatedCart, totalPrice, quantity);
  };

  const removeFromCart = (productId) => {
    const newCartItems = cartItems
      .map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    const { totalPrice, quantity } = calculateTotals(newCartItems);
    setCartItems(newCartItems);
    setTotal(totalPrice);
    setQuantity(quantity);
    saveLocalStorage(newCartItems, totalPrice, quantity);
  };

  const deleteFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item._id !== productId);

    const { totalPrice, quantity } = calculateTotals(newCartItems);
    setCartItems(newCartItems);
    setTotal(totalPrice);
    setQuantity(quantity);
    saveLocalStorage(newCartItems, totalPrice, quantity);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
    setQuantity(0);
    saveLocalStorage([], 0, 0);
  };

  useEffect(() => {
    const storageCart = localStorage.getItem("cart");
    if (storageCart) {
      const cartObj = JSON.parse(storageCart);
      setCartItems(cartObj.items);
      setQuantity(cartObj.quantity);
      setTotal(cartObj.total);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        total,
        quantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
