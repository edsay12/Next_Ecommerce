"use client";

import { CartItem } from "@/@types";
import { Button } from "../../button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addToCart, removeFromCart } from "@/lib/actions/cart.actions";

function AddToCart({ item }: { item: CartItem }) {
  const router = useRouter();
  const handdleAddToCart = async () => {
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
  };

  const handdleRemoveToCart = async () => {
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
  };
  return (
    <>
      <Button className="w-full" onClick={handdleAddToCart}>
        Adicionar ao carrinho
      </Button>
      <Button className="w-full" onClick={handdleRemoveToCart}>
        Remove item to cart
      </Button>
    </>
  );
}

export default AddToCart;
