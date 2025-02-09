import Products from "@/components/ui/shared/products/products";
import  data from '@/db/mock-products';
export const metadata = {
  title: "Home",
};

const Home = async () => {
  return (
    <div>
      <Products data={data.products} title={"Lista de Produtos"} />


    </div>
  );
};

export default Home;
