import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import PaymentMethodForm from "./components/payment-method-form";
import CheckoutSteps from "@/components/ui/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Método de pagamento",
};

async function PaymentMethod() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("userId não encontrado");
  const user = await getUserById(userId);
  return (
    <div>
      <CheckoutSteps currentStep={2} />
      <PaymentMethodForm method={user?.paymentMethod || null} />
    </div>
  );
}

export default PaymentMethod;
