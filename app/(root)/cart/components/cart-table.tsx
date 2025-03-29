/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Cart } from "@/@types";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addToCart, removeFromCart } from "@/lib/actions/cart.actions";
import { Minus, Plus } from "lucide-react";
import { useTransition } from "react";
import LoadingItem from "@/components/ui/loadingItem";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurencyFormat } from "@/lib/utils";
import { z } from "zod";
import { cartItemSchema } from "@/lib/validator";

function CartTable({ cart }: { cart: Cart }) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  console.log("carrinho", cart);

  const handdleRemoveToCart = async (item: z.infer<typeof cartItemSchema>) => {
    startTransition(async (): Promise<any> => {
      const result = await removeFromCart(item);

      if (!result?.success) {
        return toast.error(`${result?.message}`);
      }
      return toast.success(`${item.name} removido do carrinho`, {
        action: (
          <Button
            variant={"default"}
            onClick={() => {
              router.push("/cart");
            }}
          >
            Ver carrinho
          </Button>
        ),
      });
    });
  };
  const handdleAddToCart = async (item: any) => {
    startTransition(async (): Promise<any> => {
      const result = await addToCart(item);

      if (!result?.success) {
        return toast.error(`${result?.message}`);
      }
      return toast.success(`${item.name} removido do carrinho`, {
        action: (
          <Button
            variant={"default"}
            onClick={() => {
              router.push("/cart");
            }}
          >
            Ver carrinho
          </Button>
        ),
      });
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="py-4 text-2xl font-bold">Carrinho</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="py-4 text-center text-muted-foreground">
          O seu carrinho está vazio
          <Link href={"/"}>Ir para a loja</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-4">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">Preço</TableHead>
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
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <span>{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <Button
                        disabled={isLoading}
                        variant={"outline"}
                        type="button"
                        onClick={() => handdleRemoveToCart(item)}
                      >
                        {isLoading ? <LoadingItem /> : <Minus />}
                      </Button>
                      <span>{item.qtd}</span>
                      <Button
                        disabled={isLoading}
                        variant={"outline"}
                        type="button"
                        onClick={() => handdleAddToCart(item)}
                      >
                        {isLoading ? <LoadingItem /> : <Plus />}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className=" flex flex-col pb-3 text-xl">
                SubTotal ({cart.items.reduce((a, c) => a + c.qtd, 0)}) :
                <span className="text-muted-foreground">
                  Taxa de serviço: {CurencyFormat(cart.taxPrice)}
                </span>
                <span className="text-muted-foreground">
                  Frete: {CurencyFormat(cart.shipingPrice)}
                </span>
                <span className="font-bold">
                  Total: {CurencyFormat(cart.totalPrice)}
                </span>
              </div>
              <Button
                onClick={() => router.push("/shipping-adress")}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? <LoadingItem /> : "Finalizar compra"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default CartTable;
