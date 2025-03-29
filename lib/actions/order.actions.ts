"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { convertToPlainObject, formatError } from "../utils";
import { getUserById } from "./user.actions";
import { auth } from "@/auth";
import { getCartItems } from "./cart.actions";
import { CartItem, ShipingAdress } from "@/@types";
import { InsertOrderSchema } from "../validator";

export async function createOrder() {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Usuario não esta authenticado");
    }
    const cart = await getCartItems();
    const userId = session.user.id;

    if (!userId) {
      throw new Error("Usuário não encontrado");
    }

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) {
      return { success: false, message: "Carrinho vazio", redirect: "/cart" };
    }
    if (!user?.address) {
      return {
        success: false,
        message: "Nenhum endereço definido",
        redirect: "/shipping-address",
      };
    }
    if (!user.paymentMethod) {
      return {
        success: false,
        message: "Metodo de pagamento não definido",
        redirect: "/payment-method",
      };
    }

    console.log(user.address);

    // Create order object

    const order = InsertOrderSchema.parse({
      userId: userId,
      shippingAddress: user.address as ShipingAdress,
      paymentMethod: user.paymentMethod,

      itemsPrice: cart.itemsPrice,
      totalPrice: cart.totalPrice,
      shipingPrice: cart.shipingPrice,
      taxPrice: cart.taxPrice,
    });

    // create uma transação to create order and items in db

    const insertOrderId = await prisma?.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({
        data: order,
      });

      // create order items from the cart itens

      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            productId: item.productId as string,
            name: item.name as string,
            slug: item.slug as string,
            image: item.image as string,

            orderId: insertedOrder.id,
            price: item.price,
            qty: item.qtd as number,
          },
        });
      }

      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: [],
          itemsPrice: 0,
          totalPrice: 0,
          shipingPrice: 0,
          taxPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertOrderId) {
      throw new Error("Transação não foi criada");
    }

    return {
      success: true,
      message: "Pedido criado com sucesso",
      redirect: `/order/${insertOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: await formatError(error),
    };
  }
}

export async function getOrderById(orderId: string) {
  try {
    const data = await prisma?.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return convertToPlainObject(data);
  } catch {
    return null;
  }
}
