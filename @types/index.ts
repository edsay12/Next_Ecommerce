import { productSchema } from "@/lib/validator"

import { z } from "zod";


export type Product  = z.infer<typeof productSchema> & {
    id:string;
    rating: number;
    numReviews: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
};

