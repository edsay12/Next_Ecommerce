"use server";
import { SignInFormSchema, SignUpFormSchema } from "../validator";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import prisma from "../../db/db";
import { hashSync } from "bcrypt-ts-edge";
import { formatError } from "../utils";
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
