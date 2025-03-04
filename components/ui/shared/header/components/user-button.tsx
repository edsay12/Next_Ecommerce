import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/user.actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

async function UserButton() {
  const session = await auth();

  if (!session) {
    return (
      <Button variant={"default"}>
        <Link href={"/sign-in"} className="flex items-center gap-1">
          <span>Login</span>
        </Link>
      </Button>
    );
  }

  const letraInicial = session.user.name[0].toUpperCase() ?? "U";

  return (
    <div
      className="flex gap-2
    itens-center"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 bg-gray-200 rounded-full ml-2 flex items-center justify-center"
          >
            <span>{letraInicial}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 p-2 bg-white rounded-md shadow-lg mt-2 ">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="font-sm font-medium leading-none">
                {session.user.name}
              </div>
              <div className="font-sm text-muted-foreground leading-none">
                {session.user.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 mb-1 outline-none">
            <Button
              variant={"ghost"}
              className="w-full justify-start py-4 px-2 h-4 mt-2"
              onClick={signOutUser}
            >
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserButton;
