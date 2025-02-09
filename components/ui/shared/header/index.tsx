import { APP_NAME } from "@/lib/constants";

import Link from "next/link";
import Logo from "../../logo";

import Menu from "./components/menu";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="flex justify-between container items-center">
        <Link href={"/"} className="flex  items-center gap-2">
          <Logo />
          <span className="hidden lg:block font-bold text-2xl">{APP_NAME}</span>
        </Link>

        <div className=" flex items-center space-x-1">
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
