import Products from "@/components/ui/shared/products/products";

export const metadata = {
  title: "Home",
};
import { getLatestProducts } from "@/lib/actions/product.actions";

const Home = async () => {
  const data = await getLatestProducts();
  console.log(data)

  return (
    <div>
      <Products data={data} title={"Lista de Produtos"} />
    </div>
  );
};

export default Home;
