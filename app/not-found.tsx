"use client";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

function NotFound() {
  return (
    <div className="flex w-screen h-screen items-center justify-center md:p-20 ">
      <div className="flex flex-col gap-5 justify-center items-center shadow-lg rounded-lg p-10 ">
        <Logo />
        <h1 className="text-2xl font-bold text-center">Pagina Não Encontrada</h1>
        <p className="text-sm text-center ">Parece que pagina que voce procura não existe</p>
        <Button variant={"default"} size={"lg"} onClick={() => window.location.href = "/"}>
          Voltar para o início
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
