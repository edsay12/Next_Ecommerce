import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/logo";

import Link from "next/link";
import CredentialSignUpForm from "./credentialSignUpForm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata = {
  title: "Sign In",
};

async function SignUp(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const session = await auth();
  const { callbackUrl } = await props.searchParams;

  
  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href={"/"} className="flex items-center justify-center">
            <Logo />
          </Link>
          <CardTitle className="text-center">Cadastrar</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialSignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
