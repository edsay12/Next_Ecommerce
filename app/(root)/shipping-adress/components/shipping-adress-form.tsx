"use client";
import { ShipingAdress } from "@/@types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "@/lib/validator";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUserAdress } from "@/lib/actions/user.actions";
import { toast } from "sonner";

function ShipingAdressForm({ adress }: { adress: ShipingAdress }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<ShipingAdress>({
    defaultValues: adress,

    resolver: zodResolver(shippingSchema),
  });

  const onSubmit = async (data: ShipingAdress) => {
    startTransition(async () => {
      const result = await updateUserAdress(data);
      if (result.success) {
        toast.success(result.message);
        router.push("/payment-method");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="max-w-md space-y-4 mx-auto">
      <h1 className="text-2xl font-bold">Endereço de entrega</h1>
      <p className="text-sm text-muted-foreground">
        Preencha os dados de seu endereço de entrega
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="fullName">Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Camilo Santos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="fullName">Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Rua rio Camaleão" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="fullName">Codigo Postal</FormLabel>
                <FormControl>
                  <Input placeholder="Recife" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="fullName">Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Camilo Santos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="fullName">Pais</FormLabel>
                <FormControl>
                  <Input placeholder="Camilo Santos" {...field} />
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
  );
}

export default ShipingAdressForm;
