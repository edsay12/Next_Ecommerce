"use server";
import prisma from "@/db/db";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { CartItem } from "@/@types";
import { cartItemSchema, cartSchema } from "../validator";
import { revalidatePath } from "next/cache";

// calcular o total do carrinho

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = items.reduce((acc, item) => {
    return acc + Number(item.price) * item.qtd;
  }, 0);
  const shipingPrice = round2(itemsPrice > 100 ? 0 : 20);
  const taxPrice = round2(itemsPrice * 0.19);
  const cartPrice = round2(itemsPrice);
  const totalPrice = cartPrice + shipingPrice + taxPrice;

  return {
    itemsPrice: cartPrice.toFixed(2),
    shipingPrice: shipingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export const addToCart = async (CartItem: CartItem) => {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) {
      throw new Error("sessionCartId não encontrado");
    }

    // Get sessionUserId
    const session = await auth();
    const userId = session?.user.id ? (session.user.id as string) : undefined;

    const cart = await getCartItems();

    // validadte
    const item = cartItemSchema.parse(CartItem);

    // find product in db
    const product = await prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    });

    if (!product) throw new Error("produto não encontrado");

    if (!cart) {
      const newCart = cartSchema.parse({
        userId: userId,
        sessionCartId: sessionCartId,
        items: [item],
        ...calcPrice([item]),
      });
      // create new cart
      await prisma.cart.create({
        data: newCart,
      });

      // revalidate page
      revalidatePath(`product/${item.slug}`);

      return {
        success: false,
        message: `${item.name} adicionado ao carrinho`,
      };
    } else {
      // check if itens are in cart
      const existItem = cart.items.find((x) => x.productId === item.productId);

      if (existItem) {
        // check Stock
        if (product.stock < item.qtd + 1) {
          throw new Error("estoque insuficiente");
        }
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qtd = existItem.qtd + 1;
      } else {
        if (product.stock < 1) throw new Error("estoque insuficiente");
        cart.items.push(item);
      }

      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: cart.items,
          ...calcPrice(cart.items),
        },
      });
      revalidatePath(`product/${item.slug}`);
      return {
        success: true,
        message: `${item.name} adicionado ao carrinho`,
      };
    }

    return {
      success: true,
      message: "tudo certinhi",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};

export async function getCartItems() {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) {
      throw new Error("sessionCartId não encontrado");
    }

    // Get sessionUserId
    const session = await auth();
    const userId = session?.user.id ? (session.user.id as string) : undefined;

    const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
    });

    if (!cart) return undefined;

    return convertToPlainObject({
      ...cart,
      items: cart.items as CartItem[],
      itemsPrice: cart.itemsPrice,
      totalPrice: cart.totalPrice,
      shipingPrice: cart.shipingPrice,
      taxPrice: cart.taxPrice,
    });
  } catch (error) {
    return null;
  }
}

export const removeFromCart = async (CartItem: CartItem) => {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) {
      throw new Error("sessionCartId não encontrado");
    }

    const cart = await getCartItems();

    // validate
    const item = cartItemSchema.parse(CartItem);

    // find product in db
    const product = await prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    });

    if (!product) throw new Error("produto não encontrado");

    if (!cart) {
      throw new Error("carinho não encontrado");
    }

    const existItem = cart.items.find((x) => x.productId === item.productId);

    if (existItem) {
      if (existItem.qtd > 1) {
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qtd = existItem.qtd - 1;


      } else {
        cart.items = cart.items.filter((x) => x.productId !== item.productId);
        
      }

      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: cart.items,
          ...calcPrice(cart.items),
        },
      });

      revalidatePath(`product/${item.slug}`);
    } else {
      return {
        success: false,
        message: `${item.name} não esta no carinho`,
      };
    }

    return {
      success: true,
      message: `${item.name} Removido do carrinho`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};
