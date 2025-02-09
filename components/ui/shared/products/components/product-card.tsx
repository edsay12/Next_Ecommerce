
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import ProductPrice from "./product-price";

function ProductCard({ product }: { product: any }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-t-xl"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col p-4 gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-sm font-bold">{product.name}</h2>
        </Link>
        <div className="flex items-center justify-between gap-2 text-sm">
            {product.rating} Stars
            {product.stock >0 ? <ProductPrice value={product.price}/> : <span className="text-destructive text-xs">Fora do estoque</span>}
        </div>
      </CardContent>
      
    </Card>
  );
}

export default ProductCard;
