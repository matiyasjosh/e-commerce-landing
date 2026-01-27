"use client";

import { useState } from "react";
import ProductCarouselDisplay from "./product-carousel-display";

interface Product {
  id: string;
  name: string;
  price: string;
  shortDescription: string;
  brandDesc1: string;
  images: Array<{ url: string }>;
}

interface ProductCarouselClientProps {
  products: Product[];
}

export default function ProductCarouselClient({ products }: ProductCarouselClientProps) {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  const product = products[currentProduct];

  return (
    <ProductCarouselDisplay
      product={product}
      currentProduct={currentProduct}
      quantity={quantity}
      setQuantity={setQuantity}
      onNextProduct={nextProduct}
      onPrevProduct={prevProduct}
    />
  );
}
