"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";


function CredentialSignInForm() {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });
  const seachParams = useSearchParams();
  const callbackUrl = seachParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    );
  };

  return (
    <form action={action} method="POST" className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" autoComplete="email"  />
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
      <div>
        <SignInButton />
      </div>
      {data && !data.success && (
        <div className="text-sm text-center text-destructive">
          {data.message}
        </div>
      )}
      <div className="text-sm text-center text-muted-foreground">
        Não tem uma conta ainda?{"  "}
        <Link
          href="/sign-up"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Criar uma conta
        </Link>
      </div>
    </form>
  );
}

export default CredentialSignInForm;
