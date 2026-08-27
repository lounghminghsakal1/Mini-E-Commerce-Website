// src/app/products/page.jsx
import { Suspense } from "react";
import ProductsPage from "./ProductsContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <p className="text-lg font-bold text-gray-500">Loading products...</p>
        </div>
      }
    >
      <ProductsPage />
    </Suspense>
  );
}