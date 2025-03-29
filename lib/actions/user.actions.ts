"use server";
import {
  shippingSchema,
  SignInFormSchema,
  SignUpFormSchema,
} from "../validator";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import prisma from "../../db/db";
import { hashSync } from "bcrypt-ts-edge";
import { formatError } from "../utils";
import { PaymentMethod, ShipingAdress } from "@/@types";
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = SignInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    console.log("usuario", user);
    await signIn("credentials", user);

    return { success: true, message: "Login feito com sucesso!" };
  } catch (error) {
    console.log("erro", error);
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Email ou senha incorretos!" };
  }
}

export async function signOutUser() {
  return await signOut();
}

export async function signUpWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = SignUpFormSchema.parse({
      nome: formData.get("nome"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    user.password = hashSync(user.password, 10);

    console.log("user", user);
    await prisma.user.create({
      data: {
        name: user.nome,
        email: user.email,
        password: user.password,
      },
    });
    return { success: true, message: "Cadastro feito com sucesso!" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error) };
  }
}

export async function getUserById(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    return null;
  }
}

export const updateUserAdress = async (adress: ShipingAdress) => {
  try {
    const session = await auth();
    const userId = session?.user.id ? (session.user.id as string) : undefined;

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currentUser) throw new Error("usuário não encontrado");

    const address = shippingSchema.parse(adress);

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        address: address,
      },
    });
    return {
      success: true,
      message: "Endereço atualizado com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};

export const updateUserPaymentMethod = async (paymentMethod: PaymentMethod) => {
  try {
    const session = await auth();
    const userId = session?.user.id ? (session.user.id as string) : undefined;

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currentUser) throw new Error("usuário não encontrado");

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        paymentMethod: paymentMethod.type,
      },
    });
    return {
      success: true,
      message: "Método de pagamento atualizado com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};
