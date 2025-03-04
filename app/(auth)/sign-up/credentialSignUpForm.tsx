"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { signUpWithCredentials } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

function CredentialSignUpForm() {
  const [data, action] = useActionState(signUpWithCredentials, {
    success: false,
    message: "",
  });
  const seachParams = useSearchParams();
  const callbackUrl = seachParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Criandoconta..." : "Criar conta"}
      </Button>
    );
  };

  return (
    <form action={action} method="POST" className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" name="nome" autoComplete="nome" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirme sua senha</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="confirmPassword"
          required
        />
      </div>
      <div>
        <SignInButton />
      </div>
      {data && !data.success && (
        <div className="text-sm text-center text-destructive">
          {data.message}
        </div>
      )}
      <div className="text-sm text-center text-muted-foreground">
        Já possui uma conta?{" "}
        <Link
          href="/sign-in?callbackUrl=/"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Entrar
        </Link>
      </div>
    </form>
  );
}

export default CredentialSignUpForm;
