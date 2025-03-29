import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./components/order-details-table";
import { ShipingAdress } from "@/@types";

export const metadata: Metadata = {
  title: "Pedido",
};

async function OrderPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);

  if (!order) return notFound();
  return (
    <div>
      <OrderDetailsTable order={order} />
    </div>
  );
}

export default OrderPage;
