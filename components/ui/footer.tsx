import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 px-8 sm:px-12 md:px-16 lg:px-24">
      <div className="container flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold">
            {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
