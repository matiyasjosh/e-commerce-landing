import ProductCarouselClient from "@/components/product/product-carousel-client"

interface Product {
  id: string;
  name: string;
  price: string;
  shortDescription: string;
  brandDesc1: string;
  images: Array<{ url: string }>;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/fetch-product`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    const payload = data?.products ?? data ?? [];
    return Array.isArray(payload) ? payload : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Page() {
  const products = await fetchProducts();

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products available at the moment.</p>
      </div>
    );
  }

  return <ProductCarouselClient products={products} />;
}
