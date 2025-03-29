import { getCartItems } from "@/lib/actions/cart.actions";
import CartTable from "./components/cart-table";

export const metadata = {
  title: "Carrinho",
};

async function Cart() {
  const itens = await getCartItems();


  return (
    <div>
      <CartTable cart={itens} />
    </div>
  );
}

export default Cart;
