import { APP_NAME } from "@/lib/constants";
import { ShoppingCart} from "lucide-react";
import Link from "next/link";
import Logo from "../../logo";
import { Button } from "../../button";
import ToggleMode from "./components/toggle-mode";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="flex justify-between container items-center">
        <Link href={"/"} className="flex  items-center gap-2">
          <Logo />
          <span className="hidden lg:block font-bold text-2xl">{APP_NAME}</span>
        </Link>

        <div className=" flex items-center space-x-1">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
