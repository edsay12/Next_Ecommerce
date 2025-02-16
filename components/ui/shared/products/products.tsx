import { product } from "@prisma/client";
import ProductCard from "./components/product-card";

function Products({
  data,
  title,
  limit = 4,
}: {
  data: any;
  title?: string;
  limit?: number;
}) {
  const limitedData = data.slice(0, limit);
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {limitedData.map((product:product) => (
            <ProductCard key={product.slug}  product={product}/>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Nenhum produto Encontrado
        </p>
      )}
    </div>
  );
}

export default Products;
