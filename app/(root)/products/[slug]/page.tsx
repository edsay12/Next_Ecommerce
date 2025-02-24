import NotFound from "@/app/not-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductImages from "@/components/ui/shared/products/product-images";
import ProductPrice from "@/components/ui/shared/products/product-price";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { Plus } from "lucide-react";

async function Product({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) return NotFound();

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-5 ">
      {/* images column */}
      <div className="col-span-2">

        <ProductImages images={product.images} />
      </div>

      {/* details column */}
      <div className="col-span-2">
        <div className="flex flex-col gap-6">
          <p>
            {product.brand} {product.category}
          </p>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="font-medium text-sm">{product.numReviews} Reviews</p>

          <div className="flex  ">
            <div className="bg-green-200 p-4 rounded-full">
              <ProductPrice value={product.price} />
            </div>
          </div>

          <div>
            <p className="text-sm">descição:</p>
            <p className="text-sm">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Action colums */}
      <div className="col-span-1">
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 space-y-3">
              <div className="flex justify-between">
                <p>Preço</p>
                <ProductPrice value={product.price} />
              </div>
              <div className="flex justify-between">
                <p>Status</p>
                {product.stock > 0 ? (
                  <Badge variant="outline">Em estoque</Badge>
                ) : (
                  <Badge variant="destructive">Fora do estoque</Badge>
                )}
              </div>
              <div>
                {product.stock > 0 && (
                  <Button variant={"default"}>
                    <Plus />
                    Adicionar ao carrinho
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Product;
