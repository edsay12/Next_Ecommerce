import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ToggleMode from "./toggle-mode";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart } from "lucide-react";

function Menu() {
  return (
    <div className="flex items-center">
      <nav className="hidden md:flex">
        <ToggleMode />
        <Button variant={"ghost"}>
          <Link href={"/cart"} className="flex items-center gap-1">
            <ShoppingCart className="h-6 w-6" />
            <span>Cart</span>
          </Link>
        </Button>
        <Button variant={"default"}>
          <Link href={"/login"} className="flex items-center gap-1">
            <span>Login</span>
          </Link>
        </Button>
      </nav>

      <nav className="md:hidden flex">
        <Sheet>
          <SheetTrigger asChild>
            <EllipsisVertical className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-2 items-start">
            <SheetTitle>Menu</SheetTitle>

            <ToggleMode />
            <Button variant={"ghost"}>
              <Link href={"/cart"} className="flex items-center gap-1">
                <ShoppingCart className="h-6 w-6" />
                <span>Cart</span>
              </Link>
            </Button>
            <Button variant={"default"}>
              <Link href={"/login"} className="flex items-center gap-1">
                <span>Login</span>
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default Menu;
