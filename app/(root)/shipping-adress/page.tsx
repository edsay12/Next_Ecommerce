import { auth } from "@/auth";
import { getCartItems } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import ShipingAdressForm from "./components/shipping-adress-form";
import { ShipingAdress } from "@/@types";
import CheckoutSteps from "@/components/ui/shared/checkout-steps";

export const metadata = {
  title: "Endereço de entrega",
};

async function ShippingAdress() {
  const cart = await getCartItems();

  if (!cart) return <div>Carrinho não encontrado</div>;
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) throw new Error("userId não encontrado");

  const user = await getUserById(userId);

  return (
    <div>
      <CheckoutSteps currentStep={1} />
      <ShipingAdressForm adress={user?.address as ShipingAdress} />
    </div>
  );
}

export default ShippingAdress;
