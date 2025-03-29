"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { paymentMethodSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function PaymentMethodForm({ method }: { method: string | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: method || DEFAULT_PAYMENT_METHOD,
    },
  });

  const onSubmit = async (data: z.infer<typeof paymentMethodSchema>) => {
    startTransition(async () => {
      const result = await updateUserPaymentMethod(data);
      if (result.success) {
        toast.success(result.message);
        router.push("/place-order");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <div className="max-w-md space-y-4 mx-auto">
        <h1 className="text-2xl font-bold">Metodo de pagamento</h1>
        <p className="text-sm text-muted-foreground">
          Escolha seu metodo de pagamento
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <RadioGroup
                        className="space-y-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {PAYMENT_METHODS.map((method) => (
                        <FormItem
                          key={method}
                          className="flex items-center space-y-0 gap-2"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={method}
                              checked={field.value === method}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{method}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <Button type="submit" className="w-full mt-10" disabled={isPending}>
              {isPending ? "Enviando..." : "Continuar"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default PaymentMethodForm;
