
export const metadata = {
  title: "Home",
};
import ProductsList from "@/components/ui/shared/products/products-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Home = async () => {
  const data = await getLatestProducts();

  return (
    <div>
      <ProductsList data={data} title={"Lista de Produtos"} />
    </div>
  );
};

export default Home;
