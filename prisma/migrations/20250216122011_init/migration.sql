-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "price" DECIMAL(12,2) NOT NULL DEFAULT 0.0,
    "brand" TEXT NOT NULL,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0.0,
    "numReviews" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "banner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_unique" ON "product"("slug");
