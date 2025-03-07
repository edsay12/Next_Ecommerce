"use client";

import { Cart, CartItem } from "@/@types";
import { Button } from "../../button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addToCart, removeFromCart } from "@/lib/actions/cart.actions";
import { Minus, Plus } from "lucide-react";

import { useTransition } from "react";
import LoadingItem from "@/components/ui/loadingItem";
function AddToCart({ item, cart }: { item: CartItem; cart?: Cart }) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  const handdleAddToCart = async () => {
    startTransition(async (): any => {
      const result = await addToCart(item);

      if (!result!.success) {
        return toast.error(`${item.name} não foi adicionado ao carrinho`);
      }

      return toast.success(`${item.name} adicionado ao carrinho`, {
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

  const handdleRemoveToCart = async () => {
    startTransition(async (): any => {
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
  return (
    <>
      {existItem ? (
        <div className="flex gap-2 items-center">
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={handdleRemoveToCart}
          >
            {isLoading ? <LoadingItem /> : <Minus />}
          </Button>
          <span>{existItem.qtd}</span>
          <Button className="w-full" onClick={handdleAddToCart}>
            {isLoading ? <LoadingItem /> : <Plus />}
          </Button>
        </div>
      ) : (
        <Button className="w-full" onClick={handdleAddToCart}>
          {isLoading ? <LoadingItem /> : "Adicionar ao carrinho"}
        </Button>
      )}
    </>
  );
}

export default AddToCart;
