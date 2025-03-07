import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string; // 👈 Adiciona o campo `role` na sessão do usuário
    } & DefaultSession["user"];
  }


}
