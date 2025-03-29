import { ShipingAdress } from "@/@types";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CheckoutSteps from "@/components/ui/shared/checkout-steps";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getCartItems } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { CurencyFormat } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PlaceOrderForm from "./components/place-order-form";

export const metadata: Metadata = {
  title: "Finalizar compra",
};

async function PlaceOrderPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("userId não encontrado");

  const cart = await getCartItems();

  const user = await getUserById(userId);
  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }
  if (!user?.address) {
    redirect("/shipping-address");
  }
  if (!user?.paymentMethod) {
    redirect("/payment-method");
  }
  const userAddress = user.address as ShipingAdress;

  return (
    <div>
      <CheckoutSteps currentStep={3} />
      <h1 className="py-4 text-2xl font-bold">Finalizar compra</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Endereço de entrega</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city}{" "}
              </p>
              <p>
                {userAddress.postalCode}, {userAddress.country}
              </p>
              <div>
                <Link href={"/shipping-adress"} className="btn btn-primary ">
                  <Button
                    variant={"outline"}
                    className="flex gap-2 items-center"
                  >
                    Alterar <Pencil className="ml-2" width={16} />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Metodo de pagamento</h2>
              <p>{user.paymentMethod}</p>

              <div>
                <Link href={"/payment-method"} className="btn btn-primary ">
                  <Button
                    variant={"outline"}
                    className="flex gap-2 items-center"
                  >
                    Alterar <Pencil className="ml-2" width={16} />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Seus pedidos</h2>
              <p>{user.paymentMethod}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Preço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            width={50}
                            height={50}
                            alt={item.name}
                          ></Image>
                          <span className="ml-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>{item.qtd}</TableCell>
                      <TableCell>{CurencyFormat(item.price)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="flex justify-between">
                <h2 className="text-xl pb-4">Items: </h2>
                <p>{CurencyFormat(Number(cart.itemsPrice))}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl pb-4">Taxa: </h2>
                <p>{CurencyFormat(Number(cart.taxPrice))}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl pb-4">Frete: </h2>
                <p>{CurencyFormat(Number(cart.shipingPrice))}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl pb-4">Total: </h2>
                <p>{CurencyFormat(Number(cart.totalPrice))}</p>
              </div>
              <PlaceOrderForm/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
