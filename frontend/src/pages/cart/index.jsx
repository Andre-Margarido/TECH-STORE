import { useContext } from "react";
import CartProduct from "../../components/CartProduct";
import { CartContext } from "../../context/cart";

export default function CartPage() {
  const { cartItems, total } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      const response = await fetch("https://tech-store-f65z.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "cliente@email.com", // ou do user autenticado
          products: cartItems.map((item) => ({
            _id: item._id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.message || "Erro ao iniciar pagamento");
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
      alert("Erro inesperado ao iniciar o pagamento.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8 min-h-[80vh]">
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold">Carrinho de compras</h2>
        {cartItems.map((product) => (
          <CartProduct key={product._id} product={product} />
        ))}
      </div>
      <div>
        <div className="p-6">
          <div className="space-y-4 p-0">
            <h3 className="text-xl font-bold mb-2">Resumo</h3>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Sub Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Entrega</span>
              <span>€0.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>IVA</span>
              <span>€0.00</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded cursor-pointer"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
