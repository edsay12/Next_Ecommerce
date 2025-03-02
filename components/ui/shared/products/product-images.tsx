'use client'
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

function ProductImages({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  

  return (
    <div className="flex justify-center flex-col gap-2">
      <Image src={images[currentImage]} alt="product-image" className="rounded-lg min-h[300px] object-cover object-center" width={1000} height={1000} />  
      <div className="flex gap-3">
        {images.map((image, index) => (
          <div key={image} onClick={() => setCurrentImage(index)} className={cn("border-2 border-gray-200 rounded-lg p-2 cursor-pointer hover:border-gray-400", currentImage === index && "border-gray-400")}>
            <Image src={image} alt="product-image" className="rounded-lg min-h[300px] object-cover object-center" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
