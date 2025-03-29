"use client";
import { createOrder } from "@/lib/actions/order.actions";
import { useFormStatus } from "react-dom";

import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

function PlaceOrderForm() {
  const router = useRouter();

  const handdleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await createOrder();
    console.log(res);

    if (res.redirect) {
      router.push(res.redirect);
    }

    if (res.success) {
      toast.success(res.message);
    } else {
      console.log(res.message);
      toast.error(res.message);
    }
  };

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full">
        {pending ? (
          <Loader className="mr-2 animate-spin" size={16} />
        ) : (
          <Check className="mr-2" size={16} />
        )}
        Finalizar compra
      </Button>
    );
  };
  return (
    <form className="w-full" onSubmit={handdleSubmit}>
      <PlaceOrderButton />
    </form>
  );
}

export default PlaceOrderForm;
