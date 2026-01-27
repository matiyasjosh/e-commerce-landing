'use client';

import { motion, AnimatePresence } from "framer-motion";
import ProductInfo from "./product-info";
import ProductDescription from "./product-description";
import QuantitySelector from "./quantity-selector";
import ProductNavigation from "./product-navigation";
import ProductImages from "./product-images";
import SocialIcons from "./social-icon";

interface Product {
  id: string;
  name: string;
  price: string;
  shortDescription: string;
  brandDesc1: string;
  images: Array<{ url: string }>;
}

interface ProductCarouselDisplayProps {
  product: Product;
  currentProduct: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onNextProduct: () => void;
  onPrevProduct: () => void;
}

export default function ProductCarouselDisplay({
  product,
  currentProduct,
  quantity,
  setQuantity,
  onNextProduct,
  onPrevProduct,
}: ProductCarouselDisplayProps) {
  return (
    <div className="min-h-screen relative bg-white overflow-hidden overflow-x-hidden">
      <div className="relative h-screen flex items-center">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="bg-gray-300 relative h-[480px]">
            <div className="grid grid-cols-12 gap-8 items-center p-8">
              {/* Product Info */}
              <div className="col-span-2 absolute left-1/6 top-1/2 transform -translate-y-10/13">
                <ProductInfo product={product} currentProduct={currentProduct} />
              </div>

              {/* Empty space for center image */}
              <div className="col-span-4"></div>

              {/* Product Description & Controls */}
              <div className="col-span-5">
                <div className="space-y-4">
                  <ProductDescription shortDescription={product.shortDescription} currentProduct={currentProduct} />

                  {/* Quantity Selector */}
                  <div className="absolute left-10/16 top-10/11 transform -translate-y-1/12 z-30 w-80">
                    <QuantitySelector
                      quantity={quantity}
                      setQuantity={setQuantity}
                      price={product.price}
                      currentProduct={currentProduct}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <ProductNavigation onPrev={onPrevProduct} onNext={onNextProduct} />
          </div>

          {/* Product Images */}
          <ProductImages product={product} currentProduct={currentProduct} />
        </div>

        {/* Social Icons */}
        <SocialIcons />
      </div>
    </div>
  );
}
